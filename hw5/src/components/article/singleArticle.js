import React,{Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Comment from './comment'

export const SingleArticle =({id,author,date,text,img,comments,showComment,displayComment})=> {
    const _show =(e)=>{
        e.preventDefault()
        showComment = !showComment
        displayComment(id)
    }
    return(
        
	<div className="row">
        <div className="col-md-10">
            <div className="card-article">
                <div className="card-block">
                    <h className="card-title">{author}</h>
                    <p className="card-text">{date}</p>
                    <p className="card-text">{text}</p>                  
                </div>
                <img className="card-img-bottom card-img-left" src={img} />
                <div>
                    <button className="btn btn-primary col-md-3">Add Comment</button>
                    <button className="btn btn-primary col-md-3" onClick={_show}>Show Comment</button>
                </div>
                <div >
                    {showComment?comments.map((comment)=>(
                    <Comment key={comment.commentId} id ={comment.commentId} author={comment.author} date={comment.date} text={comment.text} />)):''}
                </div>
            </div>
        </div>
    </div>
    )
}

export default connect(
)(SingleArticle)