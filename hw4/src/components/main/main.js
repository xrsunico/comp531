import React from 'react'
import { connect } from 'react-redux'
import  ArticleView from '../article/articlesView'
import Headline from './headline'
import FollowingView from './following'
import Nav from '../main/nav'

const Main = () => {
	return (
		<div>
    	<br/><br/><br/>
    	<Nav />
        <Headline/>
        <ArticleView/>
        <FollowingView/>

    </div>
		
	)
}

export default connect()(Main)