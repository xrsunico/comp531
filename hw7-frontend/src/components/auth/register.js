import React , { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { registerCheck } from './authActions'

const register=({dispatch})  => {
	let username
	let email 
	let phone 
	let birth 
	let zipcode 
	let password 
	let pwconf 
	const _check=(e) =>{
		e.preventDefault()
		dispatch(registerCheck(username.value, email.value, phone.value, 
		birth.value, zipcode.value, password.value, pwconf.value))
		console.log(birth.value)
	}

    return (
		<div>
			<div className="register-login-title">
				<h3>
					Register
				</h3>
				<hr className="hr-primary" />
			</div>
			<form className="register-form">
				<div className="row register-input-row">
					<div className="col-md-4">
						Account: 
					</div>
					<div className="col-md-8">
						<input type="text" id="regname" size="30" placeholder="account name"
						ref={(node) => username = node} required>
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Email: 
					</div>
					<div className="col-md-8">
						<input type="text" id="email" size="30" placeholder="Input email address, e.g.: a@b.c"
						 ref={(node) => email = node} required>
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Date of Birth: 
					</div>
					<div className="col-md-8">
						<input type="date" id="dob" size="30" placeholder="Input date of birth"
						format="mm/dd/yyyy"  ref={(node) => birth = node} required>
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Phone: 
					</div>
					<div className="col-md-8">
						<input type="text" id="phone" size="30" 
						 placeholder = "xxx-xxx-xxxx" ref={(node) => phone = node} required>
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Zipcode: 
					</div>
					<div className="col-md-8">
						<input type="text" id="zipcode" size="30" 
						placeholder = "xxxxx or xxxxx-xxxx" ref={(node) => zipcode = node} required>
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Password: 
					</div>
					<div className="col-md-8">
						<input type="password" id="psw" size="30" placeholder="Input password"
						 ref={(node) => password = node} required>
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Password Confirmation: 
					</div>
					<div className="col-md-8">
						<input type="password" id="pwc" size="30" placeholder="Confirm password"
						 ref={(node) => pwconf = node} required>
						</input>
					</div>
				</div>
				<div className="row register-input-row">
				</div>
				<div className="row register-input-row">
					<div className="col-md-4 col-md-offset-2">
						<input type="hidden" name="timeStamp" id="idTimeStamp"/> 
						<input type="submit" className="btn btn-primary" value="Submit" id="register"
						onClick={_check}/>
					</div>
					<div className="col-md-4">
						<input type="reset" className="btn btn-danger" value="Clear"/>
					</div>
					</div>
					</form>			
		</div>
	)
}

export default connect(
// 	(state)=>{
// 		return{
// 			errMsg: state.common.errMsg
// 		}
// 	null
// 	, (dispatch)=>{
// 		return{
// 		registerCheck:(username, email, phone, birth, zipcode, password, pwconf) =>
// 		dispatch(registerCheck(e,username, email, phone, birth, zipcode, password, pwconf))
// 			}
		
// }
)(register)