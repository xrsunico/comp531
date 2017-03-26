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

var flag = true
export function updateProfile( newEmail, newZip,  newPsw, newPwconf){
	return (dispatch) =>{
        if (checkForm(newEmail, newZip, newPsw, newPwconf,dispatch)) {
			console.log(newPsw)
			if(newEmail){
				resource('PUT','email',{email: newEmail})
				.then((r)=>{
					console.log(r)
					 dispatch({type: Action.UPDATE_PROFILE, email: r.email})
					 dispatch(showSuccess('Email updated successfully'))
				})
			}
			if(newZip){
				resource('PUT','zipcode',{zipcode: newZip })
				.then((r)=>{
					dispatch({type: Action.UPDATE_PROFILE, zipcode: r.zipcode})
					dispatch(showSuccess('Zipcode updated successfully'))
				})
			}
			if(newPsw){
				resource('PUT','password',{password:newPsw})
				.then((r)=>{
					dispatch({type: Action.UPDATE_PROFILE, password: r.password})
					dispatch(showSuccess('Password cannot be changed'))
				})
			}
	}
	}
}
 
export const checkForm=(newEmail,  newZip, newPsw, newPwconf,dispatch)=>{
	if (newEmail) {
		if (!newEmail.match('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z][a-zA-Z]+$')) {
			flag = false
			dispatch(showError('Invalid email. e.g.: a@b.cd'))
			
		}
	}
	if (newZip) {
		if (!newZip.match('^(([0-9]{5})|([0-9]{5})+\-+([0-9]{4}))$')) {
			flag = false
			 dispatch(showError('Invalid zipcode. e.g.:xxxxx or xxxxx-xxxx'))
		}
	}
	if (newPsw || newPwconf) {
		if (newPsw !== newPwconf) {
			flag = false
			 dispatch(showError('Password do not match'))
		}
	}
	return true
// }
}
