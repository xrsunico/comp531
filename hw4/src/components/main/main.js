import React from 'react'
import { connect } from 'react-redux'
import  Article from '../article/article'
import Headline from './headline'
import Following from './following'
import Nav from '../main/nav'
import NewArticle from '../article/newArticle'
import SearchArticle from '../article/searchArticle'

const Main = ({username}) => {
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
			</div>
			<div className="page-head col-md-9">
				<div className="row">
					<NewArticle author ={username}/>
				</div>
			</div>
			<div className="page-body col-md-9">
				<div className="row">
				<h>sdgag</h>
					<SearchArticle/>
					<Article />
				</div>

			</div>

    </div>
		
	)
}

export default connect()(Main)