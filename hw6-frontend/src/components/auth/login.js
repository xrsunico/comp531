import React from 'react'
import { connect } from 'react-redux'
import { login } from './authActions'

const Login=({ login,dispatch})  => {
	let username, password
	const _login=() =>{
		login(username.value, password.value)
	}

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
					<input type='text' id="username" ref={(node) => username = node}>
					</input>
				</div>
			</div>

			<div className="row register-input-row">
				<div className="col-md-4">
					Password: 
				</div>
				<div className="col-md-8">
					<input type='password' id="password" ref={(node) => password 
					= node }></input>
				</div>
			</div>
			
			<div className='col-md-12'>	
			<button className='btn btn-primary' id="login" onClick={_login}> login </button>
			</div>
		</div>
	)
}


export default connect(
	null,
	(dispatch)=>{
        return{
            login: (username, password)=> dispatch(login(username, password))
        }
    }
)(Login)