import React from 'react'
import { connect } from 'react-redux'
import { login } from './authActions'

const Login=({message, login})  => {
	const _login=() =>{
		login(username.value, password.value)
	}
	let username, password

	return (
		<div>
			<div className="register-login-title">
				<h3>
					Login
				</h3>
				<hr className="hr-primary" />
			</div>

			<div className="row register-input-row">
				<div className="col-md-4">
					Account: 
				</div>
				<div className="col-md-8">
					<input type='text' ref={ (node) => { username = node }}></input>
				</div>
			</div>

			<div className="row register-input-row">
				<div className="col-md-4">
					Password: 
				</div>
				<div className="col-md-8">
					<input type='password' ref={(node) => { password = node }}></input>
				</div>
			</div>
			
			<div className='col-md-12'>	
			<button className='btn btn-primary' onClick={_login}> login </button>
			</div>
		</div>
	)
}


export default connect(
	(state)=>{
		return{
			message: state.common.message
		}
	},dispatch=>({
	login:(username, password) =>{
		dispatch(login(username, password))
	}
}))(Login)