import Action, { nav2Landing, nav2Main, updateError, resource } from '../../actions'
import { getProfile, getHeadline} from '../profile/profileActions'
import {getFollowers} from '../main/followingActions'
import { getArticles } from '../article/articleActions'
import Promise from 'bluebird'
import {validateProfile } from '../profile/profileActions'

export function login(username, password) {
    
		if (username != '' && password != '') {
			let message = "Successfully logged in"
			return ({type: Action.LOGIN, message})
		}else{
			let message = "Invalid logging "
			return ({type: Action.ERR, message})
		}
    
	
} 

export function logout() {
		return ({type: Action.LOGOUT})
}


export function registerCheck ( username, email, phone, birth, zipcode, password, pwconf) {
	//event.preventDefault()
        if (username) {
			if (!username.match('^[a-zA-Z][a-zA-Z0-9]*')) {
				console.log("sss")
				return ({type: Action.ERR, errMsg: 'Invalid username. Upper case and lower case letters and numbers only; Starts with a letter'})
			}
    	}
		if (email) {
			if (!email.match('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z][a-zA-Z]+$')) {
				return ({type: Action.ERR, errMsg: 'Invalid email. e.g. :@b.edu/a@b.co'})
			}
		}
		if (phone) {
			if (!phone.match('^([0-9]{3})+\-+([0-9]{3})+\-+([0-9]{4})$')) {
				return ({type: Action.ERR, errMsg:'Invalid phone. e.g.: ###-###-####'})
			}
		}
		if (zipcode) {
			if (!zipcode.match('^([0-9]{5})')) {
				return ({type: Action.ERR, errMsg:'Invalid zipcode. e.g.: #####'})
			}
		}
		if (password || pwconf) {
			if (password !== pwconf) {
				return ({type: Action.ERR, errMsg:'Password do not match'})
			}
		}
			console.log(username)
			return ({type: Action.LOGIN})
	
}


