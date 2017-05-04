import React,{PropTypes } from 'react'
import { connect } from 'react-redux'
import SingleFollower from './singleFollower'
import Action from '../../actions'
import {addFollower} from './followingActions'

const Following = ({ follow, addFollower}) => {
	let followername
	const _addFollower=() =>{
        if(followername){
            addFollower(followername.value)
            followername.value=''
        }
	}
	return (
		<div className="col-md-4" >
            <div id="followers">
                {
                    Object.keys(follow)
                    .map((followername)=>follow[followername])
                    .map((element) =>(
                    <SingleFollower key={element.name} 
                    name={element.name} avatar={element.avatar} 
                    headline={element.headline} />
                    
                    ))
                    
                }
            </div>
            <div className="input-group">
                <input type="text"  placeholder="Add new friend" id="newFollower"
                ref={(node) => followername = node}/>
                <div className="row">
                    <input type="button" className="btn btn-primary col-md-3" 
                    id="addFollowerBtn" value="Add" onClick={_addFollower} />
                </div>
            </div>
        </div>
	)
    
}

export default connect(
    (state) => {
        
        return {
            follow: state.follow.followers
        }
        console.log()
    }
    ,
    (dispatch) => {
        return {
            addFollower: (followername) => dispatch(addFollower(followername))
        }
    }
    
)(Following)