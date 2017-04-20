import React from 'react'
import { connect } from 'react-redux'
import { nav2Main, nav2Profile } from '../../actions'
import { logout } from '../auth/authActions'

const Nav = ({ toMain, toLanding, toProfile , logout}) => {
	return (
		<div className="navi_bar">
			<button className='btn btn-danger btn-navi' onClick={toMain} > Main 
			</button>
			<button className='btn btn-warning btn-navi' id='logout' 
			onClick={logout}> Logout 
			</button>

			<button className='btn btn-info btn-navi' id ='profile'
			onClick={toProfile}> Profile 
			</button>
		</div>
	)

}

export default connect(null,
	 (dispatch) => {
		return {
			toMain: () => dispatch(nav2Main()),
			toProfile: () => dispatch(nav2Profile()),
			logout: () => dispatch(logout())
		}
	})(Nav)