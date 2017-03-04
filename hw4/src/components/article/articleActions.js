import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Action, {resource} from '../../actions'

export const addArticle=(inputArticle)=>{
	return ({type: Action.UPDATE_ARTICLES, article: inputArticle})
}

export function searchKeyword(keyword){
	return {type:Action.UPDATE_KEYWORD, keyword};
}