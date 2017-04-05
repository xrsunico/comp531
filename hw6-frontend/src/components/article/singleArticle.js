import React,{Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Comment from './comment'
import NewComment from './newComment'
import {editArticle, displayComment} from './articleActions'
var ContentEditable = require("react-contenteditable");

export const SingleArticle =({username, id,author,date,text,img,comments,showComment,display, edit})=> {
    let newText
    const _show =(e)=>{
        e.preventDefault()
        showComment = !showComment
        display(id)
    }
    const _edit=(e)=>{
        e.preventDefault(e)
        edit(id, newText)
        newText = ''
    }
    const _addComm=()=>{
        console.log(newComm.value)
        updateComment(articleId, newComm.value, -1)
        newComm.value=''
        showComment = true
    }
    return(
    
	<div className="row singleArticle"  > 
        <div className="col-md-10">
            <div className="card-article">
                {img? <img className="card-img-bottom card-img-left" src={img} />: null}
                <div className="card-block">
                    <h className="card-title" id="articleAuthor">{author}</h>
                    <p className="card-text">{date}</p>
                    <ContentEditable className="card-text" html={text} id="editArticle"
                    disabled={username!= author} onChange={(e)=>{newText=e.target.value}}/>  
                    {username !== author?'':<button className="btn btn-primary col-md-2" 
                    onClick ={_edit} id="editBtn" >Edit</button>}               
                    <button className="btn btn-primary col-md-3" onClick={_show}>
                        {showComment?"Hide Comments":"Show Comments"}t</button>
                </div>
                <div >
                    {!showComment? '': 
                    <NewComment articleId={id} commentId={comments.commentId} showComment={showComment}/>
                    }
                    {!showComment? '':
                    comments.map((comment)=>(
                    <Comment key={comment.commentId} id ={comment.commentId} author={comment.author} 
                    date={comment.date} text={comment.text} articleId={id}/>))
                    }
                </div>
            </div>
        </div>
    </div>
    )
    console.log(showComment)
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
      edit:(id, text)=>dispatch(editArticle(id, text)),
      display:(id)=>dispatch(displayComment(id))
      }
  }
)(SingleArticle)