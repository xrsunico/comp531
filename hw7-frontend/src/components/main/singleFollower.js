import React , {PropTypes} from 'react'
import { connect } from 'react-redux'
import Action from '../../actions'
import {removeFollower} from './followingActions'

const SingleFollower = ({  name, headline, avatar, removeFollower }) => {
	const _unfollow=() =>{
			removeFollower(name)
	}
    return(
        <div className="sidebar" id="singleFollower">
            <img src={avatar} className="follower-img" />
            <h>{name}</h>
            <p>{headline}</p>
            <input type='button' id='unfollowBtn' value="Unfollow"
            className="btn btn-primary"
              onClick={_unfollow} />
        </div>
    )
    console.log(avatar)
}

export default connect(
null
, (dispatch)=>{
    return{
        removeFollower: (name) =>dispatch(removeFollower(name))
    }
})(SingleFollower)