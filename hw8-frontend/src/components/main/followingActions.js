import Action, { followers, resource, showError } from '../../actions'
import { fetchArticles } from '../article/articleActions'

export function fetchFollowers() {
	return (dispatch) =>
		resource('GET', 'following')
			.then((r) => {
				const followers = r.following.reduce((follower, element) => {
					follower[element] = { name: element };
					return follower
				}, {})
				const followerSet = r.following.join(',')
				const foHeadline = resource('GET', `headlines/${followerSet}`)
					.then((headR) => {

						headR.headlines.forEach((element) => {
							if (element && element.length > 0) {
								followers[element.username].headline = element.headline
							}
						})
						return headR
					})
				const foAvatar = resource('GET', `avatars/${followerSet}`)
					.then((avatarR) => {
						avatarR.avatars.forEach((element) => {
							if (element && element.length > 0) {
								followers[element.username].avatar = element.avatar;
							}
						})
						return avatarR
					})
				return Promise.all([foHeadline, foAvatar])
					.then(() => {
						dispatch({ type: Action.UPDATE_FOLLOWER, followers })
					}).catch((err) => {
						dispatch(showError(err))
					})
			})

}


export function removeFollower(followername) {
	return (dispatch) =>
		resource('DELETE', `following/${followername}`)
			.then((r) => {
				const followers = r.following.reduce((follower, element) => {
					follower[element] = { name: element };
					return follower
				}, {}
				)
				const followerSet = r.following.join(',')
				const foHeadline = resource('GET', `headlines/${followerSet}`)
					.then((headR) => {
						headR.headlines.forEach((element) => {
							if (element && element.length > 0) {
								followers[element.username].headline = element.headline
							}
						})
						return headR
					})

				const foAvatar = resource('GET', `avatars/${followerSet}`)
					.then((avatarR) => {
						avatarR.avatars.forEach((element) => {
							if (element && element.length > 0) {
								followers[element.username].avatar = element.avatar;
							}
						})
						return avatarR
					})
				return Promise.all([foHeadline, foAvatar, dispatch(fetchArticles())])
					.then(() => {
						dispatch({ type: Action.UPDATE_FOLLOWER, followers })
					}).catch((err) => {
						dispatch(showError("Error deleting follower"))
					})
			})

}


export function addFollower(followername) {
	return (dispatch) =>
		resource('PUT', `following/${followername}`)
			.then((r) => {
				if (r.following.indexOf(followername) < 0) {
					return dispatch(showError(`User ${followername} does not exist`))
				}
				const followers = r.following.reduce((follower, element) => {
					follower[element] = { name: element }; return follower
				}, {}
				)
				const followerSet = r.following.join(',')
				const foHeadline = resource('GET', `headlines/${followerSet}`)
					.then((headR) => {
						headR.headlines.forEach((element) => {
							if (element && element.length > 0) {
								followers[element.username].headline = element.headline
							}
						})
						return headR
					})
				const foAvatar = resource('GET', `avatars/${followerSet}`)
					.then((avatarR) => {
						avatarR.avatars.forEach((element) => {
							if (element && element.length > 0) {
								followers[element.username].avatar = element.avatar;
							}
						})
						return avatarR
					})
				return Promise.all([foHeadline, foAvatar, dispatch(fetchArticles())])
					.then(() => {
						dispatch({ type: Action.UPDATE_FOLLOWER, followers })
						followername.value = ''
					}).catch((err) => {
						dispatch(showError(err))
					})
			})
}
