import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Action  from '../../actions'

export const filterArticles = (articles,articleText) => {

    if(articleText){
        return articles.filter((element)=> 
		(element.text.indexOf(articleText) >= 0|| element.author.indexOf(articleText)>=0))
    }else{
        return articles
    }
}

export function updateKeyword(keyword) {
	return {
		type: Action.UPDATE_KEYWORD, keyword: keyword
	}
}