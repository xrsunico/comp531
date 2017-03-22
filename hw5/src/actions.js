import fetch from 'isomorphic-fetch'

const local = false
export const url = local ? 'http://localhost:8080' : 'https://webdev-dummy.herokuapp.com'

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
	UPDATE_ARTICLE: 'UPDATE_ARTICLE',
	UPDATE_KEYWORD: 'UPDATE_KEYWORD',

	REMOVE_FOLLOWER: "REMOVE_FOLLOWER",
    ADD_FOLLOWER: "ADD_FOLLOWER",
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


export function showError(errMsg) {
	return {type: Action.ERR, msg: errMsg}
}

export function showSuccess(sucMsg) {
	return {type: Action.SUCCESS, msg: sucMsg}
}

export function resource(method, endpoint, payload) {
	
	const options =  {credentials: 'include', method,
					  headers: {'Content-Type': 'application/json'}
	}
	if (payload) options.body = JSON.stringify(payload)

	return fetch(`${url}/${endpoint}`, options)
	.then((response) => {
        if (response.status === 200) {
            return (response.headers.get('Content-Type').indexOf('json') > 0) ? 
					response.json() : response.text()
        } else {
            throw new Error(response.statusText)
        } 
    })
}