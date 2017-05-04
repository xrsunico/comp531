import Action, { nav2Landing, nav2Main, showError, showSuccess,resource } 
from '../../actions'
import { fetchAvatar, fetchEmail, fetchBirth, fetchZipcode, fetchHeadline} 
from '../profile/profileActions'
import { fetchFollowers} from '../main/followingActions'
import { fetchArticles } from '../article/articleActions'

//local login
export function login(username, password) {	
    return (dispatch) => {
       return resource('POST', 'login', { username: username, password: password })
            .then((r) => {
                dispatch({ type: Action.LOGIN, username: r.username, password: r.password})
				dispatch(showSuccess("Login successfully"))
                dispatch(preLog())
            }).catch((err) => {
				dispatch(showError("Error login"))
            })
    }
} 

//login through facebook
export function FbLogin(){
	window.location = 'https://newhw8.herokuapp.com/facebook';
}

//prepare before login
export function preLog() {
    return (dispatch) => {
        return Promise.all([
			fetchAvatar()(dispatch),
			fetchEmail()(dispatch),
			fetchBirth()(dispatch),
			fetchZipcode()(dispatch),
			fetchHeadline()(dispatch),
			fetchArticles()(dispatch),
			fetchFollowers()(dispatch)
		])
		.then(()=>{
			dispatch(nav2Main())
		})
    }
}

//logout current account
export function logout() {
	return (dispatch) => {
		return resource('PUT', 'logout')
		.then((r) => {
			dispatch({type: Action.LOGOUT})
		})
		.then((r) => {
			dispatch(nav2Landing())
		})
	}
}

//check the inputs of register form
export function registerCheck (username, email, phone, birth, zipcode, password, pwconf) {
	return (dispatch) =>{
        if (!(username&&email&&phone&&birth&&zipcode&&password&&pwconf)) {
			return dispatch (showError("Registration information not complete"))
		}
		if(username&&email&&phone&&birth&&zipcode&&password&&pwconf){
			if (!username.match("^[a-zA-Z][a-zA-Z0-9]*")) {
				return dispatch(showError("Invalid username. Upper case and lower case letters and numbers only; Starts with a letter"))
			}    	
			if (!email.match("^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z][a-zA-Z]+$")) {
				return dispatch (showError("Invalid email. e.g. :@b.edu/a@b.co"))
			}	
			if (!phone.match("^([0-9]{3})+\-+([0-9]{3})+\-+([0-9]{4})$")) {
				return dispatch (showError("Invalid phone. e.g.: ###-###-####'"))
			}
			if (!validateBirth(birth)) {
				return dispatch (showError("Invalid birth. You should be older than 18"))
			}
			if (!zipcode.match("^(([0-9]{5})|([0-9]{5})+\-+([0-9]{4}))$")) {
				return dispatch (showError("Invalid zipcode. e.g.: ##### or #####-####"))
			}
			if (password !== pwconf) {
				return dispatch (showError("Password do not match"))
			}else{
				resource('POST', 'register',{username, email, phone, birth, zipcode, password, pwconf})
			.then((r)=>{
				dispatch (showSuccess("Congratulations! Registered successfully!"))
			})
			}
		}
	}
}

//check age under 18 or not
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
