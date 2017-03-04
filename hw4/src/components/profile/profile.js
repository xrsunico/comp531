import React from 'react'
import { connect } from 'react-redux'
import Nav from '../main/nav'
import UpdateProfile from './updateProfile'
import Avatar from './avatar'
import ProfileForm from './profileForm'

const Profile = () => (
	
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
				</div>
			</div>
		</div>
	)


export default connect(
	)(Profile)