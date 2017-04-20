//const uploadImage = require('./uploadCloudinary')
const Profile = require('./model.js').Profile


const getHeadlines = (req, res) => {
	var users = req.params.users ? req.params.users.split(',') : [req.username]
	console.log(users)
	Profile.find({username : {$in : users}}).exec(function(err, elements){
		if (!elements || elements.length == 0){
			res.status(400).send("Unauthorized")
			return
		}
		var headlines = elements.map((item)=>{
			return {username: item.username, headline:item.headline}
		})
		res.status(200).send({headlines})
	})
}

const putHeadline = (req, res) => {
	var username = req.username
	var newHeadline = req.body.headline
	if(!req.body.headline){
        res.status(400).send("missing the headline input")
        return
    }
    Profile.update({username:username},{$set:{headline:newHeadline}},
		{new: true}, function(err){
			console.log(req.body.headline)
        if(err)
            return console.log(err)
        else{
            Profile.find({username:username}).exec(function(err,elements){
				console.log(elements)
                if(!elements || elements.length === 0){
                    res.status(400).send("Unauthorized")
                    return
                }
                else{
                    res.status(200).send({
                    username:username,
                    headline:elements[0].headline
                    })
                }
            })
        }
    })
}

const getEmail = (req, res) => {
	var username = req.params.user ? req.params.user : req.user
	Profile.find({username: username}).exec(function(err, elements){
		if (err || elements.elements == 0){
			console.log(err)
			res.status(400).send("Unauthorized")
			return
		}
		res.send({username : elements[0].username, email: elements[0].email})
	})
}

const putEmail = (req, res) => {
	Profile.update({username: req.username}, {$set: {email: req.body.email}}, 
		{new: true}, function(){
		Profile.find({username: req.username}).exec(function(err, elements){
		if (err || elements.length == 0){
			console.log(err)
			res.status(400).send('Unauthorized')
			return
		}
		res.status(200).send({
			username : elements[0].username, email: elements[0].email})
		})
	})
}
const getZipcode = (req, res) => {
	var username = req.params.user ? req.params.user : req.user
	Profile.find({username: username}).exec(function(err, elements){
		if (err || elements.length == 0){
			console.log(err)
			res.status(400).send("Unauthorized")
			return
		}
		res.send({username : elements[0].username, zipcode: elements[0].zipcode})
	})
}
const putZipcode = (req, res) => {
	Profile.update({username: req.username}, {$set: {zipcode: req.body.zipcode}}, 
		{new: true}, function(){
		Profile.find({username: req.username}).exec(function(err, elements){
		if (err || elements.length == 0){
			console.log(err)
			res.status(400).send('Unauthorized')
			return
		}
		res.status(200).send({
			username : elements[0].username, zipcode: elements[0].zipcode})
		})
	})
}

const getAvatars = (req, res) => {
	var users = req.params.users ? req.params.users.split(',') : [req.username]
	Profile.find({username : {$in : users}}).exec(function(err, elements){
		if (!elements || elements.length == 0){
			res.status(400).send("Unauthorized")
			return
		}
		var avatars = elements.map((item)=>{
			return {username: item.username, avatar:item.avatar}
		})
		res.status(200).send({avatars})
	})
}

const putAvatar = (req, res) => {
    var username = req.username
    Profile.update({username:username},{$set:{avatar:req.body.avatar}},
		{new: true}, function(err){
        if(err)
            return console.log(err)
        else{
            Profile.find({username:username}).exec(function(err,elements){
                if(!elements || elements.length === 0){
                    res.status(400).send("Unauthorized")
                    return
                }
                else{
                    res.status(200).send({
                    username:username,
                    avatar:elements[0].avatar
                    })
                }
            })
        }
    })
}

const getDob = (req, res) => {
	var username = req.params.user ? req.params.user : req.username
	Profile.find({username: username}).exec(function(err, elements){
		if (err || elements.length == 0){
			console.log(err)
			res.status(400).send("Unauthorized")
			return
		}
		res.send({username : elements[0].username, dob: elements[0].dob})
	})
}
module.exports = app => {
     app.get('/headlines/:user?', getHeadlines)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', putAvatar)
	 app.get('/dob', getDob)
}
