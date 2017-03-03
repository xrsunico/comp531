import React from 'react'
import { connect } from 'react-redux'

const Follower = ({ key, username, headline, avatar }) => {
	return (
		<div>
			<div className="row">

				<div className="col-md-4">
					<img className="follower-img" src={avatar} />
				</div>

				<div className="col-md-7 follower-box">
					<h3>{key}</h3>
					<h4>{username}</h4>
					<h5>{headline}</h5>
				</div>


			</div>
			<div className="row">
					<hr className="hr-primary" />
			</div>





		</div>
	)
}

const FollowingView = ({ followers }) => {
	console.log(followers)
	return (
		<div>
			<div className="col-md-12">
			
			</div>

			{followers.map((follower) => 
					(<Follower key = {follower.id} 
							  username = {follower.name} 
							  avatar = {follower.avatar} 
							  headline = {follower.headline}
					/>)
				)	
			}

			<div className="row">
				<div className="col-md-8 col-md-offset-2">
					<input type="text" placeholder="new friend" />
					<button> Add </button>
				</div>
				
			</div>


		</div>
	)
}

export default connect(
	(state) => {
		return {
			followers: state.follow.follower
		}
	},)(FollowingView)