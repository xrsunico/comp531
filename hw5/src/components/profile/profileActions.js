import Action ,{ resource, showError, showSuccess} from '../../actions'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export function fetchHeadline(username) {
	return (dispatch) =>
		resource('GET', 'headlines/'+username)
		.then((r) => {
			dispatch({ type: Action.UPDATE_PROFILE, headline: r.headlines[0].headline });
		})
}

export function updateHeadline(text) {
	return (dispatch) => {
		if (text) {
			return resource('PUT', 'headline', { headline: text })
				.then((r) => {
					dispatch({ type: Action.UPDATE_PROFILE, headline: r.headline })
				})
		}
	}
}

export function fetchAvatar(item){
	return (dispatch) =>
		resource('GET', 'avatars/'+item)
		.then((r) => {
			dispatch({type: Action.UPDATE_PROFILE, avatar: r.avatars[0].avatar})
        })
}

export function fetchBirth()  {
	return (dispatch) =>
		 resource('GET', 'dob')
		.then((r) => {
            dispatch({type: Action.UPDATE_PROFILE, birth: new Date(r.dob).toJSON()})
        })
}

export function fetchEmail (item) {
	return (dispatch) => 
		resource('GET', 'email/'+item)
        .then((r) => {
            dispatch({type: Action.UPDATE_PROFILE, email: r.email})
        })
}

export function fetchZipcode (item) {
	return (dispatch) =>
		resource('GET', 'zipcode/'+item)
        .then((r) => {
            dispatch({type: Action.UPDATE_PROFILE, zipcode: r.zipcode})
        })
}


export function updateProfile( newEmail, newZip,  newPsw, newPwconf){
	
		const err = checkForm({newEmail, newZip, newPsw, newPwconf})
        if (err.length > 0) {
            return dispatch(showError(err))
        }
		
			if(newEmail){
				resource('PUT','email',{email: newEmail})
				.then((r)=>{
					console.log(r)
					dispatch({type: Action.UPDATE_PROFILE, email: r.newEmail})
				})
			}
			if(newZip){
				resource('PUT','zipcode',{zipcode: newZipcode })
				.then((r)=>{
					dispatch({type: Action.UPDATE_PROFILE, zipcode: r.newZip})
				})
			}
			// if(newPhone){
			// 	resource('PUT','phone')
			// 	.then((r)=>{
			// 		dispatch({type: Action.UPDATE_PROFILE, phone: r.newPhone})
			// 	})
			// }
			if(newPsw){
				resource('PUT','password')
				.then((r)=>{
					dispatch({type: Action.UPDATE_PROFILE, password: r.newPsw})
				})
			}
		
	
}
 
export function checkForm(newEmail,  newZip, newPsw, newPwconf){
	return (dispatch) =>{
	if (newEmail) {
		if (!newEmail.match('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z][a-zA-Z]+$')) {
			return dispatch(showError('Invalid email. e.g.: a@b.cd'))
			
		}
	}
	// if (newPhone) {
	// 	if (!newPhone.match('^([0-9]{3})+\-+([0-9]{3})+\-+([0-9]{4})$')) {
	// 		return 'Invalid phone. e.g.: ###-###-####'
	// 	}
	// }
	if (newZip) {
		if (!newZip.match('^(([0-9]{5})|([0-9]{5})+\-+([0-9]{4}))$')) {
			return dispatch(showError('Invalid zipcode. e.g.:xxxxx or xxxxx-xxxx'))
		}
	}
	if (newPsw || newPwconf) {
		if (newPsw !== newPwconf) {
			return dispatch(showError('Password do not match'))
		}
	}
}
}
