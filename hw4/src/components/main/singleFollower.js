import React , {PropTypes} from 'react'
import { connect } from 'react-redux'
import Action from '../../actions'

const SingleFollower = ({ username, headline, avatar, remove }) => {
    let name
	const _unfollow=() =>{
			remove()
	}
    return(
        <div className="sidebar">
            <img src={avatar} className="follower-img" />
            <h>{username}</h>
            <p>{headline}</p>
            <input type='button' value='Unfollow' className="btn"
            onClick={_unfollow} />
        </div>
    )
}
/*SingleFollower.propTypes = {
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
}*/

export default connect(null, (dispatch, ownProps)=>{
    return{
        remove: () =>dispatch({ type: Action.REMOVE_FOLLOWER, id: ownProps.id})
    }
})(SingleFollower)