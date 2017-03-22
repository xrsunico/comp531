import React,{PropTypes } from 'react'
import { connect } from 'react-redux'
import SingleFollower from './singleFollower'
import Action from '../../actions'
//import {addFollower} from './followingActions'

const Follower = ({ followers, addFollower }) => {
	let followername
	const _addFollower=() =>{
        if(followername){
            addFollower(followername.value)
            followername.value=''
        }
	}
	return (
		<div className="col-md-4" >
            <div>
                {
                    followers.map((follower) => (
                        <SingleFollower key={follower.id} id={follower.id} 
						username={follower.username} avatar={follower.avatar} 
						headline={follower.headline} />
                    ))
                }
            </div>
            <div className="input-group">
                <input type="text"  placeholder="Add new friend"
                ref={(node) => followername = node}/>
                <span className="input-group-btn">
                    <input type="button" className="btn"
                    value="Add" onClick={_addFollower} />
                </span>
            </div>
        </div>
	)
}

/*Follower.propTypes={
    followers: PropTypes.arrayOf(PropTypes.shape({
        ...SingleFollower.propTypes
    }).isRequired).isRequired,
    addFollower: PropTypes.func.isRequired
}*/

export default connect(
    (state) => {
        return {
            followers: state.follow.followers
        }
    },
    (dispatch) => {
        return {
            addFollower: (followername) => dispatch({type: Action.ADD_FOLLOWER, username: followername})
        }
    }
)(Follower)