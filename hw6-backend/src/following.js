let followings = [
    {user:'rx', follower:['df','wer','qwcv']}, 
    {user:'Scott', follower:['sa', 'wr','sq']}, 
    {user:'bla', follower:['12','4tv','asw','hd']}
]

function getFollowing(req, res) {
    if(req.params.user){
		res.send(followings.filter((follower) => {
		return follower.user == req.params.user
	}))
	}else{
		res.status(200).send(followings[0])
	}

}

function putFollowing(req, res) {
    if (!req.user) req.user = 'rx'
    followings.filter((follower)=>{
        if(follower.user == req.user){
            if(!follower.follower.includes(req.params.user)){
                follower.follower.push(req.params.user)
                res.status(200).send({
                    user: req.user,
                    follower: follower.follower
                })
            }
            else{
                res.status(400).send("Already follow ")
                return
            }
        }
    })
}

function deleteFollowing(req, res) {
	if (!req.user) req.user = 'rx'
    followings.filter(follower => {
        if(follower.user == req.user){
            let postDelete = follower.follower.filter(item=>{
                return item != req.params.user})
            res.status(200).send({
            user: req.user,
            follower: postDelete
            })
        }
    })
}

module.exports = app => {
	app.get('/following/:user?', getFollowing)
	app.put('/following/:user', putFollowing)
	app.delete('/following/:user', deleteFollowing)	
}