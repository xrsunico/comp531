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
	switch(action.type) {
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
		case Action.LOGOUT:
			return {
				...state, location:'LANDING'}
		case Action.LOGIN :
			return {			
				...state, username: action.username,location: 'MAIN'}
		default :
			return state
	}
}

export const article = (state = {articleID: 1000000, articles: initialArticles.articles,
	keyword:''}, action) => {
	let date = new Date().toJSON()
	//let now = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
	switch(action.type) {
		case Action.UPDATE_ARTICLES :
			return {
				...state,
				articleID: state.articleID + 1,
				articles:[
					...state.articles,{
						_id: state.articleID,
                        text: action.article,
                        date: date,
						img:"http://lorempixel.com/311/308/",
                        author: action.author,
                        comments: []
					}
				],
				keyword:''
			}
		case Action.UPDATE_KEYWORD:
			return {
				...state, keyword: action.keyword}
		default: return state;
	}
}

export const follow = (state = {foID:2,followers: initialFollowers.followers}, action) => {

	switch(action.type) {
		case Action.UPDATE_FOLLOWER:
			return {
				...state, followers: action.followers}
		case(Action.REMOVE_FOLLOWER):
			return {...state,followers:state.followers.filter(({id}) => 
					id != action.id)}
		case(Action.ADD_FOLLOWER):
			return {foID: state.foID + 1,followers:[...state.followers,
				{id: state.foID, headline:"new post", username: action.username,
				avatar:"https://3.bp.blogspot.com/-W__wiaHUjwI/Vt3Grd8df0I/AAAAAAAAA78/7xqUNj8ujtY/s1600/image02.png"
				}]}
		default: return state;
	}
}


export const initProfileState = {
	username: "rx4", 
	email: "rx4@rice.edu", 
	birth: "1993-02-12",
	phone: "123-123-1234",
	zipcode: "77030", 
	avatar: "http://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg",
	password: "123123",
	headline: "I'm a new coder",
	pwconf: "123123",
	location: "PROFILE"
	}

export const profile = (state = initProfileState,  action) => {
//console.log(username)
	switch(action.type) {
		/*case Action.LOGIN :
			return {
				...state, username: action.username, location: 'MAIN'}*/
		case Action.UPDATE_PROFILE :
			return{
				...state,
				username: action.username? action.username: state.username,
                phone: action.phone? action.phone:state.phone,
                zipcode: action.zipcode?action.zipcode:state.zipcode,
                email: action.email?action.email:state.email,
                birth:action.birth?action.birth:state.birth,
				headline:action.headline?action.headline:state.headline,
				password: action.password?action.password:state.password,
				pwconf: action.pwconf?action.pwconf:state.pwconf
			}
			console.log(username)
		default :
			return state
	}
}


const Reducer = combineReducers({ common, profile, follow, article })

export default Reducer