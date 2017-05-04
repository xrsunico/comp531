import React from 'react'
import { connect } from 'react-redux'
import {updateComment} from './articleActions'
var ContentEditable = require("react-contenteditable");

//the comment component
const Comment = ({author,date, text, username, articleId, id, updateComment}) => {
    let newText
    const _editComment=(e)=>{
        console.log(newText)
        e.preventDefault(e)
        updateComment(articleId, newText, id)
        newText = ''
    }
    return(
        <div className="row">
            <div className="col-md-10">
                <div className="card-block">
                <h><bold>{author}</bold></h>
                <h>{date}</h>
                <ContentEditable html={text} disabled={username!=author}
                onChange={(e)=>{newText=e.target.value}} /> 
                {username !== author?'':<button className="btn btn-primary col-md-3" 
                onClick ={_editComment}>Edit Comment</button>}  
                </div>
            </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {			
			username: state.profile.username
        }
	}
    ,
    (dispatch)=>{
    return{
      updateComment:(articleId, text, commentId)=>dispatch(updateComment(articleId, text, commentId)),
      }
  }
)(Comment)