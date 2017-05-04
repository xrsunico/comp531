import React from 'react'
import { connect } from 'react-redux'
import { linkLocal } from './profileActions'
import { unlink } from './profileActions'

//the display for linking and unlinking facebook account with local account
const Fblink = ({ normalName, password, dispatch, username }) => {
    return (
        <div className="panel panel-default " id="Fblink">
            <div className="panel-heading">
                <h2>Facebook Linking</h2>
            </div>
            <div className="panel-body">
                {username.indexOf('@') < 0 ?
                    <div>
                        <div>
                            <button className="btn btn-primary "
                                onClick={() => dispatch(unlink())}>UnLink</button>
                        </div>
                    </div> :
                    <div>
                        <form onSubmit={e => {
                            e.preventDefault()
                            dispatch(linkLocal(normalName.value, password.value))
                        }}>
                            <div className="form-group col-md-6">
                                <label>Normal username</label><br />
                                <input type="text" className="form-control"
                                    ref={(node) => normalName = node} required />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Normal password</label><br />
                                <input type="password" className="form-control"
                                    ref={(node) => password = node} required />
                            </div>
                            <div>
                                <input type="submit" className="btn btn-primary col-md-5"
                                    value="Link" />
                            </div>
                            <div>
                                <button className="btn btn-primary col-md-5" onClick=
                                    {() => dispatch(unlink())}>UnLink</button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            username: state.profile.username
        }
    }, null
)(Fblink)