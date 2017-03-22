import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {updateKeyword} from './articleActions'

export const SearchArticle = ({articles, dispatch}) =>{
    let searchInput
	const _search=() =>{
		if (searchInput.value){
			updateKeyword(searchInput.value)
		}
	}
	return(
			<div className="row" >
            <div className="input-group">
               <input type="text" className="col-md-12" placeholder="Search"
				ref={(node) => searchInput = node} onChange={_search}/>
            </div >
        </div>
    )
}


export function filterArticles(keyword){

    if(keyword){
        articles = articles.filter((element) => {
			return element.text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
				   element.author.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
		})
    }else{
        return articles
    }
}

export default connect((state) => {
	return {
		articles: filterArticles( state.articles.keyword)
    }
})(SearchArticle)
