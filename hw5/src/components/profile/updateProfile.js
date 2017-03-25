import React from 'react'
import { connect } from 'react-redux'
import {updateProfile} from './profileActions'

const UpdateProfile = ({errMsg,updateForm}) => {
	let newEmail 
	let newPhone 
	let newZip 
	let newPsw 
	let newPwconf 
	const _update=(e) =>{
        e.preventDefault()
		updateForm(e, newEmail.value, newPhone.value,newZip.value, newPsw.value, newPwconf.value)

        newEmail.value=''
        newZip.value =''
        newPsw.value = ''
        newPwconf.value = ''
        newPhone.value = ''
	}
	return (
        <div className="panel panel-default ">
            <div className="panel-heading"><h2>Update</h2></div>
            <div className="panel-body">
                <form >
                    <div className="form-group col-md-6">
                        <label>Email</label>
                        <input type="text" className="form-control" ref={(node)=>
                        newEmail=node} placeholder="update email" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Phone</label>
                        <input type="text" className="form-control" ref={(node)=>
                        newPhone=node} placeholder="123-123-1234" pattern="\d\d\d-\d\d\d-\d\d\d\d" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Zipcode</label>
                        <input type="text" className="form-control" ref={(node)=>
                        newZip=node} placeholder="77030" pattern="\d\d\d\d\d" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>password</label>
                        <input type="password" className="form-control" ref={(node)=>newPsw=node} />
                    </div>
                    <div className="form-group col-md-6">
                        <label>password confirmation</label>
                        <input type="password" className="form-control" ref={(node)=>newPwconf=node} />
                    </div>
                    <div className="form-group col-md-6">
                        {errMsg}
                    </div>
                    <input type="submit" className="btn btn-primary col-md-12" value ="Update"
                    onClick={_update}></input>
                </form>
            </div>
        </div>
		
	)
}

export default connect(
	null
    , dispatch =>({
            updateForm: ( newEmail, newZip, newPsw, newPwconf) =>{
			    dispatch(UpdateProfile( newEmail, newZip, newPsw, newPwconf))
            }
	}))(UpdateProfile)