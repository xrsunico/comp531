import React from 'react'
import { connect } from 'react-redux'
import  ArticleView from '../article/articlesView'
import Headline from './headline'
import Following from './following'
import Nav from '../main/nav'
import NewArticle from '../article/newArticle'
import SearchArticle from '../article/searchArticle'

const Main = ({username, errMsg, sucMsg}) => {
	return (
		<div className ="container">
			<nav className="navbar navbar-default">
				<Nav/>
			</nav>
			<br/><br/><br/>

			<div className="page-sidebar col-md-3">
				<div className="row">
					<Headline/>
				</div>
				<div className="row">
					<Following/>
				</div>
				<div className="row">
				<div className="col-md-4 col-md-offset-1"> 
					{errMsg == '' ? '' : <div className="landing-error-ms"> {errMsg} </div>}
					{sucMsg == '' ? '' : <div className="landing-success-ms"> {sucMsg} </div>}
				</div>
				
			</div>
			</div>
			<div className="page-head col-md-9">
				<div className="row">
					<NewArticle author ={username}/>
				</div>
			</div>
			<div className="page-body col-md-9">
				<div className="row">
					<SearchArticle/>
					<ArticleView />
				</div>

			</div>
			

    </div>
		
	)
}

export default connect(
	(state) => {
	return {
		errMsg: state.common.errMsg,
		sucMsg: state.common.sucMsg
	}
},)(Main)