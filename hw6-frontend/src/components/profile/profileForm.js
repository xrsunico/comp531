import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'

export const ProfileForm = ({username, email, phone, zipcode, birth})=>(
    <div className="panel panel-default ">
        <div className="panel-heading">
            <h className="panel-title">Current profile</h>
        </div>
        <div className="panel-body">
            <p >{username}</p>
            <p id="emailUpdate" >{email}</p>
            <p >{birth}</p>
            <p >{phone}</p>
            <p id="zipUpdate">{zipcode}</p>
        </div>
    </div>
)

export default connect(
	(state) => {
		return {
            username: state.profile.username,
			email: state.profile.email,
			birth: state.profile.birth,
            phone: state.profile.phone,
			zipcode: state.profile.zipcode
		}	
    })(ProfileForm)