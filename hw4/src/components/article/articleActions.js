import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Action, {resource} from '../../actions'

export function addArticle(inputArticle, author){
	return ({type: Action.UPDATE_ARTICLES, article: newPost, author: username})
}

