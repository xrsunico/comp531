import React , { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { registerCheck } from './authActions'

const register=({errMsg,registerCheck})  => {
	let username
	let email 
	let phone 
	let birth 
	let zipcode 
	let password 
	let pwconf 
	const _check=() =>{
		registerCheck(username.value, email.value, phone.value, birth.value, zipcode.value, password.value, pwconf.value)
	}

    return (
		<div>
			<div className="register-login-title">
				<h3>
					Register
				</h3>
				<hr className="hr-primary" />
			</div>
			<div className="register-form">
				<div className="row register-input-row">
					<div className="col-md-4">
						Account: 
					</div>
					<div className="col-md-8">
						<input type="text" name="test" size="30" placeholder="account name"
						id="accountName" ref={(node) => username = node} required>
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Email: 
					</div>
					<div className="col-md-8">
						<input type="text" name="test" size="30" placeholder="email Address"
						id="emailAddress" ref={(node) => email = node} required>
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Date of Birth: 
					</div>
					<div className="col-md-8">
						<input type="text" name="test" size="30" placeholder="date of birth"
						format="mm/dd/yyyy" id="idDateofBirth" ref={(node) => birth = node} required>
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Phone: 
					</div>
					<div className="col-md-8">
						<input type="text" name="test" size="30" placeholder="phone number"
						id="phoneNumber" placeholder = "xxx-xxx-xxxx" ref={(node) => phone = node} required>
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Zipcode: 
					</div>
					<div className="col-md-8">
						<input type="text" name="test" size="30" placeholder="zipcode"
						id="zipcode" placeholder = "xxxxx" ref={(node) => zipcode = node} required>
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Password: 
					</div>
					<div className="col-md-8">
						<input type="password" name="test" size="30" placeholder="password"
						id="password" ref={(node) => password = node} required>
						</input>
					</div>
				</div>
				<div className="row register-input-row">
					<div className="col-md-4">
						Password Confirmation: 
					</div>
					<div className="col-md-8">
						<input type="password" name="test" size="30" placeholder="password"
						id="passwordConfirmation" ref={(node) => pwconf = node} required>
						</input>
					</div>
					<div className="col-md-4">
						{errMsg}
					</div>
				</div>
				<div className="row register-input-row">
				</div>
				<div className="row register-input-row">
					<div className="col-md-4 col-md-offset-2">
						<input type="hidden" name="timeStamp" id="idTimeStamp"/> 
						<input type="submit" className="btn btn-primary" value="Submit"
						onClick={_check}/>
					</div>
					<div className="col-md-4">
						<input type="reset" className="btn btn-danger" value="Clear"/>
					</div>
					

					
				</div>
				</div>
			
		</div>
	)
}

export default connect(
	(state)=>{
		return{
			errMsg: state.common.errMsg
		}
	}, dispatch=>({
	registerCheck:( username, email, phone, birth, zipcode, password, pwconf) =>{
		dispatch(registerCheck( username, email, phone, birth, zipcode, password, pwconf))
	}
}))(register)