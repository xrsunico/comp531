import React from 'react'
import { connect } from 'react-redux'
import Nav from '../main/nav'
import Login from './login'
import Register from './register'

const Landing = ({ errorMsg }) => {
	return (
		<div className="profile_page_container">
			<div className="row">
				<div className="col-md-10 col-md-offset-1 landing-header"> 
						<h1>RiceBook</h1>
				</div>
			</div>

			<div className="row">
				<div className="col-md-10 col-md-offset-1">
					<div className="col-md-6">
						<div className="col-md-10 col-md-offset-1 well">
							<Login />
						</div>
					</div>

					<div className="col-md-6">
						<div className="col-md-10 col-md-offset-1 well">
							<Register />
						</div>
						
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-md-4 col-md-offset-1"> 
					<h4 className="landing-error-msg">{errorMsg}</h4>
				</div>
				
			</div>


		</div>
	)
}

export default connect((state) => {
	return {
		errorMsg: state.common.errMsg
	}
}, )(Landing)