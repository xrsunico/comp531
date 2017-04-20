import Action, { followers, resource } from '../../actions'
import {showError} from '../../actions'

export function fetchFollowers(username) {
	return (dispatch) =>
		resource('GET', 'following/')
		.then((r) => {
			console.log(r)
			const followers = r.following.reduce((follower, element) => {
					follower[element] = { name: element }; 
					return follower
				},{})
			const followerSet = r.following.join(',')
			const foHeadline = resource('GET',`headlines/${followerSet}`)
			.then((headR) => {
				// console.log(headR)
				headR.headlines.forEach((element) =>{
					followers[element.username].headline = element.headline
				})
				return headR
			})
			
			const foAvatar = resource('GET',`avatars/${followerSet}`)
			.then((avatarR) => {
				avatarR.avatars.forEach((element) =>{
					followers[element.username].avatar = element.avatar;
				})
				return avatarR
			})
			return Promise.all([foHeadline, foAvatar])
				.then(() => {
					// console.log(followers)
					dispatch({ type: Action.UPDATE_FOLLOWER, followers })
				})
		})

}


export function removeFollower(followername){
	console.log(followername)
	return (dispatch) => 
		resource('DELETE', `following/${followername}`)
		.then((r) => {
			const followers = r.following.reduce((follower, element) => {
				follower[element] = { name: element }; 
				return follower
			}, {}
			)
			const followerSet = r.following.join(',')
			const foHeadline = resource('GET',`headlines/${followerSet}`)
			.then((headR) => {
				headR.headlines.forEach((element) =>{
					followers[element.username].headline = element.headline
				})
				return headR
			})
			
			const foAvatar = resource('GET',`avatars/${followerSet}`)
			.then((avatarR) => {
				avatarR.avatars.forEach((element) =>{
					followers[element.username].avatar = element.avatar;
				})
				return avatarR
			})
			return Promise.all([foHeadline, foAvatar])
				.then(() => {
					// console.log(followers)
					dispatch({ type: Action.UPDATE_FOLLOWER, followers })
				})
			})

}


export function addFollower(followername){
	return (dispatch)=>
		resource('PUT', `following/${followername}`)
			.then((r) => {
				if(r.following.indexOf(followername)<0){
					return dispatch(showError(`User ${followername} does not exist`))
				}
				const followers = r.following.reduce((follower, element) => {
					follower[element] = { name: element }; return follower
				}, {}
				)
				const followerSet = r.following.join(',')
				const foHeadline = resource('GET',`headlines/${followerSet}`)
					.then((headR) => {
					headR.headlines.forEach((element) =>{
						followers[element.username].headline = element.headline
					})
					return headR
				})
				const foAvatar = resource('GET',`avatars/${followerSet}`)
				.then((avatarR) => {
					avatarR.avatars.forEach((element) =>{
						followers[element.username].avatar = element.avatar;
					})
					return avatarR
				})
				return Promise.all([foHeadline, foAvatar])
					.then(() => {
						dispatch({ type: Action.UPDATE_FOLLOWER, followers })
					})
			})
}
