import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {updateKeyword} from './articleActions'

export const SearchArticle = ({filter}) =>{
    let searchInput
	const _search=() =>{
		if (searchInput){
			filter(searchInput.value)
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

export function filterArticles(articles, filter){
    if(filter){
        return articles.filter((element) => {
			console.log(element.text.toLowerCase())
			return element.text.toLowerCase().includes(filter.toLowerCase()) ||
				element.author.toLowerCase().includes(filter.toLowerCase())
		})
    }else{
        return articles
    }
	console.log(articles)
}

export default connect(
	null,
	(dispatch) => ({
		filter: (keyword) => dispatch(updateKeyword(keyword))
	})
    )(SearchArticle)
