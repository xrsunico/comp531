import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Comment from './comment'

class Article extends Component {

  constructor(props) {
    super(props)
    this.showComment = false
  }

  render(){
	  return (
		  <div className = "card">
			  <div>
				<p>{this.props.text}</p>
				<center>
				<img className = "card-image" src={this.props.img}/>
				</center>
			 </div>

			 <div className="card-button">
				<label className="btn btn-warning"
				onClick={() => {
					this.showComment = !this.showComment
					this.forceUpdate()
				}}>
				{ this.showComment ? 'Show' : 'Hide' } Comments ({
				  this.props.comments.length })
				</label>
			</div>

			<div className="card-comment">
			{!this.showComment?'': 
				this.props.comments.map((comment)=>
				<Comment key={comment.commentId} date={comment.date} text={comment.text}
				 author={comment.author}/>
				)
			}	
			</div>	

		  </div>
	  )

  }
}


export default connect()(Article)