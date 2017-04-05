import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Action from '../../actions'
import SingleArticle from './singleArticle'
import {updateComment,editArticle} from './articleActions'
import {filterArticles} from './searchArticle'

export const ArticlesView=({articleSet, username}) =>{
	// console.log(articleSet)
	return(
		<div className="row" >
			<div id="articleSet">
				{ articleSet.sort((a, b) => {
							return a.date===b.date?0:a.date<b.date?1:-1
					})
					.map(({_id, author, date, text, img, comments, showComment, username})=>(	
						<SingleArticle key={_id} id={_id} author={author} date={date} 
						text={text} img={img} comments={comments} showComment ={showComment} 
						username={username} />
					))
				}
			</div>
		</div>
)
}

export default connect(
	(state) => {
        return {			
            articleSet: filterArticles(state.article.articles, state.article.keyword),
			username: state.profile.username
        }
	}
	,null
    )(ArticlesView)