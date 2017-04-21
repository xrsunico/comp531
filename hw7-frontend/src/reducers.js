import { combineReducers } from 'redux'
import Action from './actions'

export const commonState = {
	location: 'LANDING',
	sucMsg: '',
	errMsg: ''
}

export const common = (state = commonState, action) => {
	switch(action.type) {
		case Action.LOGIN :
			return {			
				...state, username: action.username, password: action.password}
		case Action.NAV2MAIN : 
			return {
				...state, location: 'MAIN', username: action.username}
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
				...state, sucMsg: action.sucMsg}
		case Action.LOGOUT:
			return {
				...state, username:''}
		default :
			return state
	}
}

export const articleState = {articles: [], keyword:''}
export const article = (state = articleState, action) => {
	switch(action.type) {
		case Action.UPDATE_ARTICLE :
			return {
				...state,
				articles: action.articles,
				keyword:''
			}
		case Action.ADD_ARTICLE:
			let newArticles = state.articles
			let newArticle = action.article
			newArticle['showComment'] = false
			// console.log(newArticles)
			newArticles[newArticles.length] = newArticle
			return{
				...state,
				articles: newArticles,
				keyword:''
			}
		case Action.EDIT_ARTICLE:{
			let newArticles = state.articles
			let newArticle = action.article
			// console.log(newArticles)
			newArticles[newArticles.length] = newArticle
			return{
				...state,
				articles: newArticles,
				keyword:''
			}
		}
		case Action.SHOW_COMMENT:{
			return{
				...state,
				articles:state.articles.map((element)=>{
					if(element._id == action.id){
						return {...element, showComment:!element.showComment}
					}else{
						return element
					}
				})
			}
		}
		case Action.UPDATE_KEYWORD:{}
			return {
				...state, keyword: action.keyword}
		default: return state;
	}
}

export const followState = {}
export const follow = (state = followState, action) => {

	switch(action.type) {
		case Action.UPDATE_FOLLOWER:
			return {
				...state, 
				followers: action.followers,
			}
		default: return state;
	}
}


export const profileState = {
	username: "", 
	email: "", 
	birth: "",
	phone: "",
	zipcode: "", 
	avatar: undefined,
	password: "",
	headline: "",
	pwconf: "",
	}

export const profile = (state = profileState,  action) => {
	switch(action.type) {
		case Action.LOGIN :
			return {			
				...state, username: action.username}
		case Action.UPDATE_PROFILE :
			return{
				...state,
				username: action.username? action.username: state.username,
                phone: action.phone? action.phone:state.phone,
                zipcode: action.zipcode?action.zipcode:state.zipcode,
				avatar: action.avatar?action.avatar:state.avatar,
                email: action.email?action.email:state.email,
                birth:action.birth?action.birth:state.birth,
				headline:action.headline?action.headline:state.headline,
				password: action.password?action.password:state.password,
				pwconf: action.pwconf?action.pwconf:state.pwconf
			}
		default :
			return state
	}
}


const Reducer = combineReducers({ common, profile, follow, article })

export default Reducer