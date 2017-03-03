import React from 'react'
import { connect } from 'react-redux'
import { nav2Main, nav2Profile } from '../../actions'
import { logout } from '../auth/authActions'

const Nav = ({ toMain, toLanding, toProfile , logout}) => {
	return (
		<div className="navi_bar">
			<button className='btn btn-warning btn-navi'onClick={logout}> Log out 
			</button>

			<button className='btn btn-info btn-navi'onClick={toProfile}> Edit Profile 
			</button>
		</div>
	)

}

export default connect(null,
	 (dispatch) => {
		return {
			toProfile: () => dispatch(nav2Profile()),
			logout: () => dispatch(logout())
		}
	})(Nav)