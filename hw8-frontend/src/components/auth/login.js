import React from 'react'
import { connect } from 'react-redux'
import { login, FbLogin } from './authActions'

const Login=({ login, FbLogin })  => {
	let username, password
	const _login=() =>{
		console.log("sdfgf")
		login(username.value, password.value)
	}
	const _fbLogin = () => {
		console.log("sdf")
        FbLogin()  

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
			<button className='btn btn-primary' id="login" onClick={
				_login}> login </button>
			<button className="waves-effect waves-light btn blue" id="fblogin" 
			onClick={_fbLogin} >Facebook Login</button>
			</div>
		</div>
	)
}


export default connect(
	null,
	(dispatch)=>{
        return{
            login: (username, password)=>dispatch(login(username, password)),
			FbLogin: ()=>dispatch(FbLogin())
        }
    }
)(Login)