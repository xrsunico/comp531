import React,{Component, PropTypes} from 'react'
import { connect} from 'react-redux'
import Action from '../../actions'
import {addArticles} from './articleActions'

export const NewArticle = ({ author, postArticle}) => {
    let newPost
    const _postArticle = () => {
        postArticle(author, newPost.value)
        newPost.value = ''
    }
    return(
        <div className="col-md-6 col-sm-12">
            <div  className="col-md-4 col-sm-5">
                <br />
                <img src="http://vignette2.wikia.nocookie.net/uncyclopedia/images/1/1e/Ben-Affleck-Smoke.jpg/revision/latest?cb=20120820211812" 
                className="profile-img"/>
            </div>
            <div className="col-md-4 col-sm-4">
            </div>
            <div className="col-md-6 col-sm-5">
                <textarea rows="12" cols="40" placeholder="Post new articles"
                ref={(node) => newPost = node}>
                </textarea>
            </div>
            <div className="col-md-4 col-sm-4">
                <input type="file" accept="image/*" />
            </div>
            <div className="col-md-4 col-sm-4">
            </div>
            <div className="col-md-6 col-sm-6" >
                <div className="btn-group" role="group" >
                    <button className="btn btn-success" type="reset"  onClick={()=>{newPost.value = ''}}
                    >Cancel</button>
                    <button className="btn btn-success" type="submit" onClick={_postArticle}
                    >Post</button>
                </div>
            </div>
        </div>
    )
}

export default connect(
   (state)=>{
		return {author:state.profile.username}
	},
   (dispatch)=>{
        return {
            postArticle: (author,newPost)=> (addArticles(author, newPost))(dispatch)
        
    }  
})(NewArticle)
