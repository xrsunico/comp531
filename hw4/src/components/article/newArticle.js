import React,{Component, PropTypes} from 'react'
import { connect} from 'react-redux'
import Action from '../../actions'
//import {addArticle} from './articleActions'

export const NewArticle = ({ post}) => {
    let article
    const _reset = ()=>{
        // cancel button to clear the text area
        article.value = ''
    }
    const _post = () => {
        // post button to publish an article
        post(article.value)
        _reset()
    }
    // const _addArticle=() =>{
    // //    addArticle(inputArticle.value)
       
    //         console.log("sd234t")
    //         addArticle(author,inputArticle.value)
        
    //     inputArticle.value=''
    // }
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
                ref={(node) => article = node}>
                </textarea>
            </div>
            <div className="col-md-4 col-sm-4">
                <input type="file" accept="image/*" />
            </div>
            <div className="col-md-4 col-sm-4">
            </div>
            <div className="col-md-6 col-sm-6" >
                <div className="btn-group" role="group" >
                    <button className="btn btn-success" type="reset"  onClick={ _reset}>Cancel</button>
                    <button className="btn btn-success" type="submit" onClick={_post}
                    >Post</button>
                </div>
            </div>
        </div>
    )
}

export default connect(
    (state) => {
         return {
            author: state.profile.username
         },
   (dispatch)=>{
        return {
    // addArticle: (author, inputArticle) => dispatch({ type: Action.UPDATE_ARTICLES, author, inputArticle})
            post: (article)=> dispatch({type: Action.UPDATE_ARTICLES, article: article, author: author})
        }
    }  
})(NewArticle)
    // (state) => {
    //     return {
    //         author: state.profile.username
    //     },
    // (dispatch) =>{
    //     return{
    //         addArticle: (author,inputArticle) => 
    //     dispatch({ type: Action.UPLOAD_ARTICLES,  author, inputArticle})
    //     }
    // }
    // })(NewArticle)
