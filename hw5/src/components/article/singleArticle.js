import React,{Component} from 'react'
import { connect } from 'react-redux'
import Comment from './comment'

export const SingleArticle =({author, date, text, img})=> (
	<div className="row">
        <div className="col-md-10">
            <div className="card-article">
                <div className="card-block">
                    <h className="card-title">{author}</h>
                    <h className="card-text">{date}</h>
                    <p className="card-text">{text}</p>                  
                </div>
                <img className="card-img-bottom card-img-left" src={img} />
                <div>
                    <button className="btn btn-primary col-md-3">Edit</button>
                    <button className="btn btn-primary col-md-3">Comment</button>
                </div>
                <div>
                    <Comment key={comment.commentId} author={comment.author} date={comment.date} text={comment.text} />)}
                </div>
            </div>
        </div>
    </div>
)

export default connect()(SingleArticle)