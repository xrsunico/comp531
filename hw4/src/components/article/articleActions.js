import { FILTER_KEYWORD, ADD_ARTICLE } from '../../actions'

export function searchKeyword(keyword) {
	return { type: Action.SEARCH_KEYWORD, keyword }
}
    
export const addArticle = (article) => {
	return {
		type: POST,
		text: article.text,
		date: article.date,
		img: article.img,
		comments: article.comments,
		author: article.author
	}
}

export const getArticles = (username) => {
	return (dispatch) => {
		resource('GET', `${username}/articles`)
		.then((response) => {
			let articles = initialArticles.articles
			articles.forEach((article) => {
				dispatch({type:ActionType.ADD_ARTICLE_PART, articleId:article.articleId, part:article})
			})

		})
	}
}