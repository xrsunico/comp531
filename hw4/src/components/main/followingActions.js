import Action, { followers, resource } from '../../actions'

const initialFollowers = require('../../data/followers.json')

export const getFolloweds = (username) => {
	return (dispatch) => {
		resource('GET', `${username}/following`)
		.then((response) => {
			let followerst = initialFollowers.followers
			followerst.forEach((follower) => {
				dispatch({type:ActionType.ADD_FOLLOWED, 
					username: follower.username, item: follower})
			})
		})
	}
}
export function removeFollower(name){
	return (dispatch)=>{
		dispatch({type:Action.REMOVE_FOLLOWER,username:name})
	}	
}

export function addFollower(followername){
	return (dispatch)=>{
		dispatch({type:Action.ADD_FOLLOWER,
			follower:{name:followername,
				avatar:"http://henrycavill.org/images/Photoshoots/2013-AP/hq/002-Henry-Cavill.jpg",
				headline:"Hi everyone, I'm new here"
			}})
	}	
}
