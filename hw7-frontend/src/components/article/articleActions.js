import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Action, {resource, showError, showSuccess} from '../../actions'

export function updateKeyword(keyword) {
	return {
		type: Action.UPDATE_KEYWORD, keyword
	}
}
export function updateArticles(articles){
	return {
		type:Action.UPDATE_ARTICLE, articles		
	}
}
export function fetchArticles(){
	return (dispatch)=>
		resource('GET','articles')
	.then((r)=>{
		// console.log(r)
		dispatch(updateArticles(r.articles))
	}).catch((err)=>{
            console.log(err)
        })
}
export const displayComment=(id)=>{
	return (dispatch) =>{
		dispatch({type: Action.SHOW_COMMENT, id})
	}
}

// export function addArticles(author, article, img){
// 	return (dispatch) => {
// 		let fd = new FormData()
// 		fd.append('text', article)
// 		if(img){
// 			fd.append('image', img)
// 		}
// 		console.log(fd.text)
//     	resource('POST', 'article', fd, false)
// 		// resource('GET', 'articles')
// 		.then((r) => {
// 			console.log(r)
// 			Promise.all(
// 				[dispatch({type: Action.ADD_ARTICLE, article: r.articles[0]}),
// 				dispatch(fetchArticles())]
// 			).then((res)=>{
// 			dispatch(showSuccess('New article added successfully'))
// 			})
// 		})
// 	}
// }
export function addArticles(author, article){
	return (dispatch) => {
    	resource('POST', 'article', {text:article})
		// resource('GET', 'articles')
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
export function editArticle(id, text){
    return (dispatch) => {
        console.log(text)
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
export function updateComment(id, text, commentId){
    return (dispatch) => {
		console.log(id)
		let payload = {text : text}
		console.log(payload)
		if(commentId){
			payload.commentId = commentId
			console.log(commentId)
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

