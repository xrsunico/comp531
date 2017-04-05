import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {updateComment} from './articleActions'

export const NewComment = ({articleId,CommentId, showComment,updateComment})=> {
    let newComm
    const _addComm=()=>{
        console.log(newComm.value)
        updateComment(articleId, newComm.value, -1)
        newComm.value=''
    }
    return (
        <div className="row">
        <div className="col-md-10">
            <div className="card-block">
                <div className="row">
                <textarea ref={node=> newComm = node}/>
                </div>
                <div className="row">
                 <button className="btn btn-primary col-md-3" onClick={_addComm}>
                Add Comment</button>
                </div>
            </div>
        </div>
        </div>
    )  
}

export default connect(
    null,
	(dispatch)=>{
		return{
		updateComment: (articleId,text,CommentId)=>dispatch(updateComment(articleId, text,CommentId))
	    }
	}
)(NewComment)