
import React from 'react'
import { connect } from 'react-redux'

export const Avatar = ({avatar})=>(
    <div className="panel panel-default">

        <div className="panel-body">
            <div className="form-group">
                <h> sfsfsf</h>
                <img src={avatar} className="col-md-12"/>
            </div>
            <div className="form-group">
                <input type="file" accept="image/*"/>
            </div>
            <button className="btn btn-primary col-md-12">upload</button>
        </div>
    </div>
)

export default connect(
	(state) => {
		return {
			avatar: state.profile.avatar,
		}	
    })(Avatar)
