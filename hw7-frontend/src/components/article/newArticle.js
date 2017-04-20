import React,{Component, PropTypes} from 'react'
import { connect} from 'react-redux'
import Action from '../../actions'
import {addArticles} from './articleActions'

export const NewArticle = ({ author, addArticles}) => {
    let newPost, img
    const _addArticles = () => {
        addArticles(author, newPost.value, img)
        newPost.value = ''
    }
    const  handleImageChange=(e)=>{
        e.preventDefault()
        img = e.target.files[0];
    }
    return(
        <div className="col-md-6 col-sm-12">
            <div >
                <textarea className="col-md-6 col-sm-12"  id = "newPost"
                placeholder="Post new articles" ref={(node) => newPost = node}>
                </textarea>
            </div>
            <div className="col-md-4 col-sm-4">
                <input type="file" accept="image/*" onChange = {(e) => handleImageChange(e)} />
            </div>
            <div className="col-md-4 col-sm-4">
            </div>
            <div className="col-md-6 col-sm-6" >
                
                    {/*<button className="btn btn-success" type="reset"  onClick={()=>{newPost.value = ''}}
                    >Cancel</button>*/}
                    <button className="btn btn-primary col-md-6" type="submit" onClick={_addArticles}
                    id="postBtn" >Post</button>
                
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
            addArticles: (author,article, img)=> (addArticles(author, article, img))(dispatch)
        
    }  
})(NewArticle)
