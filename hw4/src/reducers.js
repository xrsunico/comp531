import { combineReducers } from 'redux'
import Action from './actions'

export const commonState = {
	location: 'LANDING',
	errMsg: '',
	updateMsg: ''
}
const initialFollowers = require('./data/followers.json')
const initialArticles = require('./data/articles.json')
const initialProfile = require('./data/profile.json')

export const common = (state = commonState, action) => {
	console.log('sdfdfd')
	switch(action.type) {
		case Action.NAV2MAIN : 
			return {
				...state, location: 'MAIN'}
		case Action.NAV2PROFILE : 
			return {
				...state, location: 'PROFILE'}
		case Action.NAV2LANDING : 
			return {
				...state, location: 'LANDING'}
		case Action.ERR :
			return {
				...state, errMsg: action.errMsg}
		case Action.SUCCESS :
			return {
				...state, updateMsg: action.updateMsg}
		case Action.LOGOUT:
			return {
				...state, location:'LANDING'}
		case Action.LOGIN :
			return {
				...state, username: action.username, message: action.message, location: 'MAIN'}
		default :
			return state
	}
}

export const article = (state = {articles: initialArticles.articles}, action) => {
	switch(action.type) {
		case Action.UPDATE_ARTICLES :
			return {
				...state, articles: action.articles}
		case Action.UPDATE_KEYWORD:
			return {
				...state, keyword: action.keyword}
		default:
			return state
	}
}

export const follow = (state = {follower: initialFollowers.followers}, action) => {
	switch(action.type) {
		case Action.UPDATE_FOLLOWER:
			return {
				...state, followers: action.followers}
		case(Action.GET_FOLLOWERS):
			return {...state,followers: followersjson.following}
		case(Action.REMOVE_FOLLOWER):
			return {...state,followers:state.followers.filter(({name}) => 
					name != action.username)}
		case(Action.ADD_FOLLOWER):
			return {...state,followers:state.followers.concat([action.follower])}
		default: return state;
	}
}


export const initProfileState = {
	username: initialProfile.username, 
	email: initialProfile.email, 
	zipcode: initialProfile.zipcode, 
	avatar: initialProfile.avatar,
	password: initialProfile.password, 
	headline: initialProfile.headline,
	password: initialProfile.password,
	pwconf: initialProfile.pwconf 

	}

export const profile = (state = initProfileState,  action) => {
	switch(action.type) {
		case Action.LOGIN :
			return {
				...state, username: action.username, location: 'MAIN'}
		case Action.UPDATE_PROFILE :
			if (action.email) {
				return {...state, email: action.email}
			}
			if (action.zipcode) {
				return {
					...state, zipcode: action.zipcode}
			}
			if (action.avatar) {
				return {
					...state, avatar: action.avatar}
			}
			if (action.headline) {
				return {
					...state, headline: action.headline}
			}
			if (action.dob) {
				return {...state, dob: action.dob}
			}
			if (action.password) {
				return {...state, dob: action.password}
			}
			if (action.pwconf) {
				return {...state, dob: action.pwconf}
			}
		default :
			return state
	}
}


const Reducer = combineReducers({ common, profile, follow, article })

export default Reducer