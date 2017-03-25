import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Action from '../../actions'
import SingleArticle from './singleArticle'
import {updateComment} from './articleActions'
import {filterArticles} from './searchArticle'

export const ArticlesView=({articleSet,displayComment}) =>{
	
	return(
		<div className="row" >
			<div>
				{ articleSet.sort((a, b) => {
							return a.date===b.date?0:a.date<b.date?1:-1
					})
					.map(({_id, author, date, text, comments, showComment})=>(	
						<SingleArticle key={_id} id={_id} author={author} date={date} 
						text={text} comments={comments} showComment ={showComment} 
						displayComment={displayComment}  />
					))
				}
			</div>
		</div>
)
}

export default connect(
	(state) => {
        return {			
            articleSet: filterArticles(state.article.articles, state.article.keyword)
        }
	}
	,(dispatch)=>{
		return{
			displayComment: (id)=>dispatch(updateComment(id))
		}
	}
    )(ArticlesView)