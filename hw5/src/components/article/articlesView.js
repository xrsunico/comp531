import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Action from '../../actions'
import SingleArticle from './singleArticle'
import {filterArticles} from './searchArticle'

export const ArticlesView=({article}) =>{
	return(
		<div className="row" >
			<div>
				{ article.sort((a, b) => {
							return a.date===b.date?0:a.date<b.date?1:-1
					}).map(({_id, img, text, author, date})=>(

						<SingleArticle key={_id} id={_id} img={img} text={text} 
						author={author} date={date} />
					))
				}
			</div>
		</div>
)
}

export default connect(
	(state) => {
        return {
            article: filterArticles(state.article.articles, state.article.keyword)
        }
    })(ArticlesView)