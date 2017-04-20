var Profile = require('./model.js').Profile

function getFollowing(req, res) {
    var username = req.params.user ? req.params.user : req.user
    Profile.find({username: username}).exec(function(err, elements){
        if (err || elements.length == 0){
            console.log(err)
            return
        }
        res.status(200).send({username: username, 
             following: elements[0].following})
        
    })
}

function putFollowing(req, res) {
    var newfollow = req.params.user
    var username = req.username
    if (!req.params.user) {
        res.status(400).send('Invalid input')
        return
    }
    else{
        Profile.find({username:newfollow}).exec(function(err, elements){
            if(err)
                return console.log(err)
            else if(!elements || elements.length === 0){
                console.log(elements)
                res.status(400).send('No user found')
                return
            }
            else{             
                    var followSet = elements[0].following
                    var followed = followSet.filter((r)=>{return r == newfollow})
                    if(!followed  || followed.length === 0){
                        Profile.update({username:username}, {$addToSet:{following:newfollow}}, 
                            {new:true}, function(err){
                            if(err){
                                console.log(err)
                                return
                            }else{
                                Profile.find({username:username}).exec(function(err, ele){
                                    var newSet = ele[0].following
                                    res.status(200).send({
                                        username:username,
                                        following:newSet
                                    })
                                })
                            }
                        })                
                    }
                    else{
                        res.status(400).send('Already followed')
                        return
                    }           
            }
        })
    }
}

function deleteFollowing(req, res) {
	var username = req.username
    var deletedFollower = req.params.user
    if(!deletedFollower){
        res.status(400).send("Invalid input")
        return
    }
    Profile.update({username:username}, {$pull:{following:deletedFollower}}, 
        {new:true}, function(err){
            Profile.find({username:username}).exec(function(err, ele){
            res.status(200).send({
                username:username,
                following:ele[0].following
            })
        })
    })
}

module.exports = app => {
	app.get('/following/:user?', getFollowing)
	app.put('/following/:user', putFollowing)
	app.delete('/following/:user', deleteFollowing)	
}