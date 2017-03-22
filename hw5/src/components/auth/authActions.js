import Action, { nav2Landing, nav2Main, updateError, resource } from '../../actions'
import { getProfile, getHeadline} from '../profile/profileActions'
//import {getFollowers} from '../main/followingActions'
import { getArticles } from '../article/articleActions'
import Promise from 'bluebird'
import {validateProfile } from '../profile/profileActions'

export function login(username, password) {
    
		if (username != '' && password != '') {
			return ({type: Action.LOGIN,  username})
		}else{
			let message = "Invalid logging "
			return ({type: Action.ERR, message})
		}
    
	
} 

export function logout() {
		return ({type: Action.LOGOUT})
}


export function registerCheck (e, username, email, phone, birth, zipcode, password, pwconf) {
		e.preventDefault()

        if (!(username&&email&&phone&&birth&&zipcode&&password&&pwconf)) {
			return ({type: Action.ERR, errMsg: 'Registration information not complete'})
		}
		if(username&&email&&phone&&birth&&zipcode&&password&&pwconf){
			if (!username.match('^[a-zA-Z][a-zA-Z0-9]*')) {
				return ({type: Action.ERR, errMsg: 'Invalid username. Upper case and lower case letters and numbers only; Starts with a letter'})
			}    	
			if (!email.match('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z][a-zA-Z]+$')) {
				return ({type: Action.ERR, errMsg: 'Invalid email. e.g. :@b.edu/a@b.co'})
			}	
			if (!phone.match('^([0-9]{3})+\-+([0-9]{3})+\-+([0-9]{4})$')) {
				return ({type: Action.ERR, errMsg:'Invalid phone. e.g.: ###-###-####'})
			}
			if (!validateBirth(birth)) {
				return ({type: Action.ERR, errMsg:'Invalid birth. You should be older than 18'})
			}
			if (!zipcode.match('^([0-9]{5})')) {
				return ({type: Action.ERR, errMsg:'Invalid zipcode. e.g.: #####'})
			}
			if (password !== pwconf) {
				return ({type: Action.ERR, errMsg:'Password do not match'})
			}
			return ({type: Action.LOGIN})
		}
	
}

function validateBirth(date) {
	var dateRef = new Date()
	var dateArr = date.split('-')
	var dob = new Date(dateArr[0],dateArr[1],dateArr[2])
	var ageY = dateRef.getFullYear() - dob.getFullYear();
	var permit = 0
	if(ageY < 18){
		permit = 1;
	}else if (ageY == 18){
		if (dateRef.getMonth() < dob.getMonth()){
			permit = 1;
		}else if (dateRef.getMonth() == dob.getMonth()){
			if(dateRef.getDay() < dob.getDay()){
				permit = 1;
			}
		}
	}
	return permit == 0
}
