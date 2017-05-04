import Action ,{ resource, url, showError, showSuccess,nav2Main} from '../../actions'
import fetch, { mock } from 'mock-fetch'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { preLog } from '../auth/authActions'

//get current headlines
export function fetchHeadline() {
	return (dispatch) =>
		resource('GET', 'headlines')
			.then((r) => {
				dispatch({
					type: Action.UPDATE_PROFILE, username: r.headlines[0].username,
					headline: r.headlines[0].headline
				});
			})
}

//show current headline
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

//get current avatars
export function fetchAvatar(item){
	return (dispatch) =>
		resource('GET', 'avatars')
		.then((r) => {
			dispatch({type: Action.UPDATE_PROFILE, avatar: r.avatars[0].avatar})
        })
}

//show current avatar
export function updateAvatar(img){
	return (dispatch) =>{
		console.log(img)
		let fd = new FormData()
		fd.append('image', img)
		resource('PUT', 'avatar', fd, false)
		.then((r) => {
			console.log(r)
			dispatch({type: Action.UPDATE_PROFILE, avatar: r.avatar})
			dispatch(showSuccess('Avatar updated successfully'))
        	})
		}
}

//get the date of birth of current user
export function fetchBirth()  {
	return (dispatch) =>
		 resource('GET', 'dob')
		.then((r) => {
            dispatch({type: Action.UPDATE_PROFILE, birth: new Date(r.dob).toJSON()})
        })
}

//get current email of user
export function fetchEmail () {
	return (dispatch) => 
		resource('GET', 'email')
        .then((r) => {
            dispatch({type: Action.UPDATE_PROFILE, email: r.email})
        })
}

//get current zipcode of user
export function fetchZipcode () {
	return (dispatch) =>
		resource('GET', 'zipcode')
        .then((r) => {
            dispatch({type: Action.UPDATE_PROFILE, zipcode: r.zipcode})
        })
}

//update and display all the information for user
export function updateProfile( newEmail, newZip,  newPsw, newPwconf){
	return (dispatch) =>{
		const err = checkForm(newEmail, newZip, newPsw, newPwconf,dispatch)
		if(err){
			return err
		}
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
				dispatch(showSuccess('Password updated successfully'))
			})
		}
	}
}
 
 //check the input of profile form
const checkForm=(newEmail,  newZip, newPsw, newPwconf,dispatch)=>{
	if (newEmail) {
		if (!newEmail.match('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z][a-zA-Z]+$')) {
			dispatch(showError('Invalid email. e.g.: a@b.cd'))			
		}
	}
	if (newZip) {
		if (!newZip.match('^(([0-9]{5})|([0-9]{5})+\-+([0-9]{4}))$')) {
			 dispatch(showError('Invalid zipcode. e.g.:xxxxx or xxxxx-xxxx'))
		}
	}
	if (newPsw || newPwconf) {
		if (newPsw !== newPwconf) {
			 dispatch(showError('Password do not match'))
		}
	}
}

// link to the local account
export const linkLocal = (username, password) => {
    return (dispatch) => {
        if (username && password) {
            resource('POST', 'linklocal', {localUser: username, localPsw: password})
            .then(r => {
                dispatch(showSuccess('Linked successfully to local account'))
            }).catch(err => {
                dispatch(showError('Error link to local account'))
            })
        }
    }
}

// unlink facebook account with local account
export const unlink = () => {
    return (dispatch) => {
        resource('GET', 'unlink')
        .then(r => {
            dispatch(showSuccess('Unlinked successfully'))
        }).catch(err => {
            dispatch(showError('Error unlink'))
        })
    }
}