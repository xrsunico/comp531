import React from 'react'
import { connect } from 'react-redux'
import Main from './main/main.js'
import Profile from './profile/profile.js'
import Landing from './auth/landing.js'

const App = ({location}) => {
	if (location == 'LANDING') {
		return <Landing />
	} 
    else if (location == 'MAIN') {
		return <Main />
	}else{
		return <Profile />
	}
}

export default connect((state) => {
	return {location: state.common.location}
}, )(App)