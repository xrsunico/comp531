
const Action = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
	ERR: 'ERROR',
	SUCCESS: 'SUCCESS', 

	NAV2MAIN: 'NAV2MAIN',
	NAV2LANDING: 'NAV2LANDING',
	NAV2PROFILE: 'NAV2PROFILE',

	UPDATE_PROFILE: 'UPDATE_PROFILE',
	UPDATE_FOLLOWER: 'UPDATE_FOLLOWER',
	UPDATE_ARTICLES: 'UPDATE_ARTICLES',
	UPDATE_KEYWORD: 'UPDATE_KEYWORD',

	REMOVE_FOLLOWER: "remove follower",
    ADD_FOLLOWER: "add follower",
}
export default Action

export function nav2Main() {
	return {type: Action.NAV2MAIN}
}

export function nav2Profile() {
	return {type: Action.NAV2PROFILE}
}

export function nav2Landing() {
	return {type: Action.NAV2LANDING}
}

export function followers() {
	return {type: Action.GET_FOLLOWERS}
}

export function updateError(errMsg) {
	return {
		type: Action.ERR,
		msg: errMsg
	}
}

export function updateSuccess(successMsg) {
	return {
		type: Action.SUCCESS,
		msg: successMsg
	}
}

export function resource(method, endpoint, payload) {
	
	return Promise.all([])
}