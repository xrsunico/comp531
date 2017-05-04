import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Action, {resource, showError, showSuccess} from '../../actions'

//update the current keyword of search
export function updateKeyword(keyword) {
	return {
		type: Action.UPDATE_KEYWORD, keyword
	}
}

//update all articles so far
export function updateArticles(articles){
	return {
		type:Action.UPDATE_ARTICLE, articles		
	}
}

//get all articles
export function fetchArticles(){
	return (dispatch, getState)=>
		resource('GET', 'articles')
			.then((r) => {
				dispatch(updateArticles(r.articles))
			}).catch((err) => {
				console.log(err)
			})
}

//show comments
export const displayComment=(id)=>{
	return (dispatch) =>{
		dispatch({type: Action.SHOW_COMMENT, id})
	}
}

//add new articles with images or text only
export function addArticles(author, article, img){
	return (dispatch) => {
		let fd = new FormData()
		fd.append('text', article)
		if(img){
			fd.append('image', img)
		}
    	resource('POST', 'article', fd, false)
		.then((r) => {
			console.log(r)
			Promise.all(
				[dispatch({type: Action.ADD_ARTICLE, article: r.articles[0]}),
				dispatch(fetchArticles())]
			).then((res)=>{
			dispatch(showSuccess('New article added successfully'))
			})
		})
	}
}

//update the edited article
export function editArticle(id, text){
    return (dispatch) => {
        resource('PUT', `articles/${id}`, {text : text})
        .then((r)=>{
			Promise.all([
				 dispatch({type:'EDIT_ARTICLE',article: r.articles[0]}),
				dispatch(fetchArticles())]
			).then((res)=>{
				dispatch(showSuccess('Edited successfully'))
			})
        }).catch((err)=>{
            console.log(err)
        })
    }
}

//add new comment and display
export function updateComment(id, text, commentId){
    return (dispatch) => {
		let payload = {text : text}
		if(commentId){
			payload.commentId = commentId
		}
        resource('PUT', `articles/${id}`, payload)
        .then((r)=>{
			Promise.all([
				dispatch({type:'EDIT_ARTICLE',article: r.articles[0]}),
				dispatch(fetchArticles())
			]).then((res)=>{
				dispatch(showSuccess('Comment updated successfully'))
			})
        })
		.catch((err)=>{
            console.log(err)
        })
    }
}

