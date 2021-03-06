import React from 'react'
import { connect } from 'react-redux'
import {updateProfile} from './profileActions'

const UpdateProfile = ({dispatch}) => {
	let newEmail 
	let newPhone 
	let newZip 
	let newPsw 
	let newPwconf 
	const _update=(e) =>{
        //console.log(newEmail.value)
        e.preventDefault()
		dispatch(updateProfile( newEmail.value, newZip.value, newPsw.value, 
        newPwconf.value))
        newEmail.value=''
        newZip.value =''
        newPsw.value = ''
        newPwconf.value = ''
	}
    
	return (
        <div className="panel panel-default ">
            <div className="panel-heading"><h2>Update</h2></div>
            <div className="panel-body">
                <form >
                    <div className="form-group col-md-6">
                        <label>Email</label>
                        <input type="text" className="form-control" id="newEmail"
                        ref={(node)=>newEmail=node} placeholder="update email" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Zipcode</label>
                        <input type="text" className="form-control" id="newZip"
                        ref={(node)=>newZip=node} placeholder="77030" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>password</label>
                        <input type="password" className="form-control" id="newPsw"
                        ref={(node)=>newPsw=node} />
                    </div>
                    <div className="form-group col-md-6">
                        <label>password confirmation</label>
                        <input type="password" className="form-control" id="newPwc"
                        ref={(node)=>newPwconf=node} />
                    </div>
                    <input type="submit" className="btn btn-primary col-md-12" value ="Update"
                    id="updateBtn" onClick={_update}></input>
                </form>
            </div>
        </div>
		
	)
}

export default connect(
	// (state)=> {
    // return {
    //     errMsg: state.common.errMsg
    //     }
    // }
    // , dispatch =>{
        
    //         updateProfile: ( newEmail, newZip, newPsw, newPwconf) =>{
	// 		    dispatch(UpdateProfile( newEmail, newZip, newPsw, newPwconf))
    //         }
	// }
    )(UpdateProfile)