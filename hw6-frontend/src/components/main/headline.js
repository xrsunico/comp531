import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {updateHeadline} from '../profile/profileActions'
import Action, { resource } from '../../actions'

export const headline = ({avatar, username, headline, updateHeadline}) =>{
    let text
    const _updateHeadline=() =>{
		updateHeadline(text.value)
        text.value = ''
	}
    return (
        <div className="col-md-2 col-sm-12" id="headlinePart">
            <div className="panel-body">
                <img src={avatar} className="profile-img"/>
                <h id="mainName" >{username}</h>
                <p id="headline" >{headline}</p>
                <input  type="text" placeholder="update your headline"
                id="newHeadline" ref={(node)=> text=node}/>
                <button className='btn' onClick={_updateHeadline}
                id="updateHeadBtn" > 
                Update</button>
            </div>
        </div>
    )
}


export default connect(
	(state) => {
	return {
		username : state.profile.username,
		headline: state.profile.headline,
		avatar: state.profile.avatar
	}
}, (dispatch) => {
	return {
		updateHeadline: (text) =>{
            (updateHeadline(text))(dispatch)
        }
	}
})(headline)