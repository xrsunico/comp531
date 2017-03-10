import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const SearchArticle = ({filter}) =>{
    let searchInput
	const _search=() =>{
		if (searchInput.value){
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


export const filterArticles = (articles,articleText) => {

    if(articleText){
        return articles.filter((element)=> (element.text.indexOf(articleText) >= 0|| element.author.indexOf(articleText)>=0))
    }else{
        return articles
    }
}

export default connect(null,(dispatch)=>{
    return {
        filter: (searchInput) => dispatch({type: Action.UPDATE_KEYWORD, keyword: searchInput})
    }
})(SearchArticle)
