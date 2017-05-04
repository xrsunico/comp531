var Profile = require('./model.js').Profile
var User = require('./model').User

//get the list of users being followed by the requested user
function getFollowing(req, res) {
    var username = req.params.user ? req.params.user : req.username
    Profile.find({ username: username }).exec(function (err, elements) {
        if (err || elements.length == 0) {
            console.log(err)
            return
        } else {
            res.status(200).send({
                username: username,
                following: elements[0].following
            })
        }
    })
}

//add :user to the following list for the loggedInUser
function putFollowing(req, res) {
    var newfollow = req.params.user
    var username = req.username
    if (!req.params.user) {
        res.status(400).send('Invalid input')
        return
    }
    else {
        Profile.find({ username: newfollow }).exec(function (err, elements) {
            if (err)
                return console.log(err)
            else {
                Profile.find({ username: username}).exec(function (err, profileSet){
                    if (err) {
                        return console.log(err)
                    }
                    var followSet = profileSet[0].following
                    if (elements.length > 0 && 
                    !(followSet.indexOf(elements[0].username) >= 0)) {
                        followSet.push(elements[0].username)
                    }
                    Profile.update({ username: profileSet[0].username },
                        { $set: { following: followSet } }, { new: true }, function (err) {
                            if (err) {
                                console.log(err)
                                return
                            } else {
                                Profile.find({ username: username }).exec(function (err, ele) {
                                    var newSet = ele[0].following
                                    res.status(200).send({
                                        username: ele[0].username,
                                        following: newSet
                                    })
                                })
                            }
                        })
                })
            }
        })
    }
}

//remove :user to the following list for the loggedInUser
function deleteFollowing(req, res) {
    var username = req.username
    var deletedFollower = req.params.user
    if (!deletedFollower) {
        res.status(400).send("Invalid input")
        return
    }
    Profile.update({ username: username }, { $pull: { following: deletedFollower } },
        { new: true }, function (err) {
            Profile.find({ username: username }).exec(function (err, ele) {
                res.status(200).send({
                    username: username,
                    following: ele[0].following
                })
            })
        })
}

module.exports = app => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
}