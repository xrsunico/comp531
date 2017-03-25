import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Action, {resource} from '../../actions'

export function updateKeyword(keyword) {
	return {
		type: Action.UPDATE_KEYWORD, keyword
	}
}
export function updateArticles(articles){
	return{
		type:Action.UPDATE_ARTICLE, articles}
}
export function fetchArticles(){
	return (dispatch)=>
		resource('GET','articles')
	.then((r)=>{
		// console.log(r)
		dispatch(updateArticles(r.articles))
	})
}
export const updateComment=(id)=>{
	return (dispatch) =>{
		dispatch({type: Action.SHOW_COMMENT, id})
	}
}

export function addArticles(author, article){
	return (dispatch) => 
    	resource('POST', 'article', { text: article })
		.then((r) => {
			console.log(r)
			dispatch({type: Action.ADD_ARTICLE, article: r.articles[0]})
		})
}

