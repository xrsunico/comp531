import fetch from 'isomorphic-fetch'

export const url = 'http://localhost:3000'

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
	ADD_ARTICLE: 'ADD_ARTICLE',
	UPDATE_AVATAR: 'UPDATE_AVATAR',
	EDIT_ARTICLE: 'EDIT_ARTICLE',
	UPDATE_KEYWORD: 'UPDATE_KEYWORD',
	REMOVE_FOLLOWER: "REMOVE_FOLLOWER",
    ADD_FOLLOWER: "ADD_FOLLOWER",
	SHOW_COMMENT:"SHOW_COMMENT"

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


export function showError(message) {
	return {type: Action.ERR, errMsg: message}
}

export function showSuccess(message) {
	return {type: Action.SUCCESS, sucMsg: message}
}

export function resource(method, endpoint, payload, isJson = true) {
	
	const options =  {credentials: 'include', method}
	if (isJson) options.headers = {'Content-Type': 'application/json'}
	if (payload) options.body = isJson ? JSON.stringify(payload) : payload

	return fetch(`${url}/${endpoint}`, options)
	.then((response) => {
		console.log("sdff")
		console.log(response)
        if (response.status === 200) {
            return (response.headers.get('Content-Type').indexOf('json') > 0) ? 
					response.json() : response.text()
        } else {
			console.error(`${method} ${endpoint} ${response.statusText}`)
            throw new Error(response.statusText)
        }
		 
    }
)
}