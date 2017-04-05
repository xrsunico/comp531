import React from 'react'
import { connect } from 'react-redux'
import {updateAvatar} from './profileActions'

export const Avatar = ({avatar, updateAvatar})=>{
    let img
    const _updateAvatar=() =>{
		updateAvatar(img)
	}
    const  handleImageChange=(e)=>{
        e.preventDefault()
        img = e.target.files[0];
    }
    return(
        <div className="panel panel-default">

            <div className="panel-body">
                <div className="form-group">
                    <img src={avatar} className="col-md-12"/>
                </div>
                <div className="form-group">
                    <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />
                </div>
                <button className="btn btn-primary col-md-12" onClick={_updateAvatar}>
                    upload</button>
            </div>
        </div>
    )
}

export default connect(
	(state) => {
		return {
			avatar: state.profile.avatar,
		}	
    },(dispatch) => {
	return {
		updateAvatar: (img) =>{
            dispatch(updateAvatar(img))
        }
	}
}
)(Avatar)
