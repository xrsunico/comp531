import React from 'react'
import { connect } from 'react-redux'
import Nav from '../main/nav'
import UpdateProfile from './updateProfile'
import Avatar from './avatar'
import ProfileForm from './profileForm'
import Fblink from './fblink'

const Profile = ({ errMsg, sucMsg }) => (
	
		<div>
			<div className="container">
				<div className="col-md-10 ">
					<div className="row">
						<div className="col-md-3">
							<Nav />
						</div>
						<div className="col-md-9 profile-header">
							<h1>Your profile </h1>
						</div>
					</div>					
				</div>
			</div>
			<div className="row panelContainer">
            	<div className="col-md-3">
					<Avatar/>
					<ProfileForm/>
				</div>
				<div className="col-md-5 ">
					<UpdateProfile/>
					<Fblink/>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4 col-md-offset-1"> 
					{errMsg == '' ? '' : 
					<div className="landing-error-ms" id="profileErr" > {errMsg} </div>}
					{sucMsg == '' ? '' : 
					<div className="landing-success-ms" id="profileSuc" > {sucMsg} </div>}
				</div>
				
			</div>
		</div>
	)


export default connect(
	(state) => {
	return {
		errMsg: state.common.errMsg,
		sucMsg: state.common.sucMsg
	}
		},	)(Profile)