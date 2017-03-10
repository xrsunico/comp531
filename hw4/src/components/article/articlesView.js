import React,{Component} from 'react'
import { connect } from 'react-redux'

export const SingleArticle =({img,text,date,author })=> (
	<div className="row">
        <div className="col-md-10">
            <div className="card">
                <img className="card-img" src={img} />
                <div className="card-block">
                    <h className="card-title">{author}</h>
                    <h className="card-text">{date}</h>
                    <p className="card-text">{text}</p>
                    <button className="btn btn-primary col-md-3">Edit</button>
                    <button className="btn btn-primary col-md-3">Comment</button>
                </div>
            </div>
        </div>
    </div>
)

export default connect()(SingleArticle)