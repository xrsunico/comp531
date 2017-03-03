import React from 'react'
import { connect } from 'react-redux'
import Article from './article'
import {searchKeyword} from './articleActions'

export function filterArticles (articles, keyword ) {
	
	let objectArticles = Object.keys(articles).sort().map(_id => articles[_id])
	let filteredArticles = objectArticles;
	if (keyword && keyword.length !== 0){
		filteredArticles = objectArticles.filter((article) => {
			return article.author.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
				   article.text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
		})
	} 
	let sortedFilteredArticles = filteredArticles.sort((article1, article2)=> {
		return article2.date - article1.date
	})
	return sortedFilteredArticles
}


export const ArticleView = ({ articles, searchKeyword }) => {
	let keywordInput = ''

	const _searchKeyword = () => {
		searchKeyword(keywordInput.value)
	}
	
	return (
		<div>

			<div className="row text">
				<div className="col-md-12">
					<input type="text" size={50} ref={ (node) => { keywordInput = node }} />
					<button className="btn btn-info" onClick={_searchKeyword}> Filter </button>
				</div>	
			</div>


			<div>			
				{articles.map((article) => 
						<Article key = {article._id}
								 author = {article.author}
								 date = {new Date(article.date).toDateString()}
								 text = {article.text}
								 comments = {article.comments}
						/>
					)	
				}
			</div>
		</div>
	)
} 

export default connect(
	(state) => {
		return {
			articles: filterArticles( state.article.articles,state.article.keyword)
		}
	}
)(ArticleView)