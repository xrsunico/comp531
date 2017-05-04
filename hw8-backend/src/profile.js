var Profile = require('./model').Profile
var uploadImage = require('./uploadCloudinary.js').uploadImage

//Get the headlines for multiple users
const getHeadlines = (req, res) => {
	var users = req.params.users ? req.params.users.split(',') : [req.username]
	Profile.find({ username: { $in: users } }).exec(function (err, elements) {
		if (!elements || elements.length == 0) {
			res.status(400).send("Unauthorized")
			return
		} else {
			var headlines = elements.map((item) => {
				return { username: item.username, headline: item.headline }
			})
			res.status(200).send({ headlines })
		}
	})
}

//Update the headline for the loggedInUser
const putHeadline = (req, res) => {
	var username = req.username
	var newHeadline = req.body.headline
	if (!req.body.headline) {
		res.status(400).send("missing the headline input")
		return
	}
	Profile.update({ username: username }, { $set: { headline: newHeadline } },
		{ new: true }, function (err) {
			if (err)
				return console.log(err)
			else {
				Profile.find({ username: username }).exec(function (err, elements) {
					if (!elements || elements.length === 0) {
						res.status(400).send("Unauthorized")
						return
					}
					else {
						res.status(200).send({
							username: username,
							headline: elements[0].headline
						})
					}
				})
			}
		})
}

//get the email address for the requested user
const getEmail = (req, res) => {
	var username = req.params.user ? req.params.user : req.username
	Profile.find({ username: username }).exec(function (err, elements) {
		if (err) {
			console.log(err)
			return
		} else if (!elements || elements.length == 0) {
			res.status(400).send("Unauthorized")
			return
		} else {
			res.send({ username: username, email: elements[0].email })
		}
	})
}

//update the email addres for the loggedInUser
const putEmail = (req, res) => {
	Profile.update({ username: req.username }, { $set: { email: req.body.email } },
		{ new: true }, function () {
			Profile.find({ username: req.username }).exec(function (err, elements) {
				if (err || elements == undefined) {
					console.log(err)
					res.status(400).send('Unauthorized')
					return
				}

				res.status(200).send({
					username: username, email: elements[0].email
				})
			})
		})
}

//get the zipcode for the requested user
const getZipcode = (req, res) => {
	var username = req.params.user ? req.params.user : req.username
	Profile.find({ username: username }).exec(function (err, elements) {
		if (err || !elements || elements.length == 0) {
			console.log(err)
			res.status(400).send("Unauthorized")
			return
		}
		res.send({ username: username, zipcode: elements[0].zipcode })
	})
}

//update the zipcode for the loggedInUser
const putZipcode = (req, res) => {
	Profile.update({ username: req.username }, { $set: { zipcode: req.body.zipcode } },
		{ new: true }, function () {
			Profile.find({ username: req.username }).exec(function (err, elements) {
				if (err || elements.length == 0) {
					console.log(err)
					res.status(400).send('Unauthorized')
					return
				}
				res.status(200).send({
					username: elements[0].username, zipcode: elements[0].zipcode
				})
			})
		})
}

//get the avatar address(es) for the requested user(s)
const getAvatars = (req, res) => {
	var users = req.params.users ? req.params.users.split(',') : [req.username]
	Profile.find({ username: { $in: users } }).exec(function (err, elements) {
		if (!elements || elements.length == 0) {
			res.status(400).send("Unauthorized")
			return
		}
		var avatars = elements.map((item) => {
			return { username: item.username, avatar: item.avatar }
		})
		res.status(200).send({ avatars })
	})
}

//Update the avatar address for the loggedInUser
const putAvatar = (req, res) => {
	var username = req.username
	var avatar = req.fileurl
	Profile.update({ username: username }, { $set: { avatar } },
		{ new: true }, function (err) {
			if (err)
				return console.log(err)
			else {
				Profile.find({ username: username }).exec(function (err, elements) {
					if (!elements || elements.length === 0) {
						res.status(400).send("Unauthorized")
						return
					}
					else {
						res.status(200).send({
							username: username,
							avatar: elements[0].avatar
						})
					}
				})
			}
		})
}

//get the date of birth in milliseconds for the requested user
const getDob = (req, res) => {
	var username = req.params.user ? req.params.user : req.username
	Profile.find({ username: username }).exec(function (err, elements) {
		if (err || elements.length == 0) {
			res.status(400).send("Unauthorized")
			return
		}
		res.send({ username: elements[0].username, dob: elements[0].dob })
	})
}
module.exports = app => {
	app.get('/headlines/:users?', getHeadlines)
	app.put('/headline', putHeadline)
	app.get('/email/:user?', getEmail)
	app.put('/email', putEmail)
	app.get('/zipcode/:user?', getZipcode)
	app.put('/zipcode', putZipcode)
	app.get('/avatars/:users?', getAvatars)
	app.put('/avatar', uploadImage('avatar'), putAvatar)
	app.get('/dob', getDob)
}
