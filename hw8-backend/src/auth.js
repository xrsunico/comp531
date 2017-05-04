var md5 = require('md5')
var User = require('./model').User
var Article = require('./model').Article
var Profile = require('./model').Profile
var Comment = require('./model.js').Comments
var users = {};
var cookieKey = 'sid'
var request = require('request')
var qs = require('querystring')
var express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

const config = {
	clientID: '1249125958488894',
	clientSecret: '8f03e7944369649bfd2e530ba98a8b67',
	callbackURL: 'https://newhw8.herokuapp.com/auth/callback'
}

var redis = require('redis')
	.createClient("redis://h:p27ddd6fcbdd84990f400ce2c2c41b83d30c7886f4401dae615381d65e296a37e@ec2-34-206-77-235.compute-1.amazonaws.com:7499")

const hello = (req, res) => {
	console.log('isAuthenticated?', req.isAuthenticated())
	res.status(200).send({ hello: 'world' })
}


//log out of server, clears session id
function logout(req, res) {
	if (req.isAuthenticated()) {
		req.session.destroy()
		req.logout()
		return res.status(200).send('OK')
	} else {
		req.logout()
		redis.del(req.cookies[cookieKey])
		res.clearCookie(cookieKey)
		return res.status(200).send('OK')
	}
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		User.findOne({ authorization: { 'facebook': req.user.username } }).exec(function (err, element) {
			if (!element) {
				req.username = req.user.username
				//console.log("islog?",req.username)
			}
			else {
				req.username = element.username
				///console.log("islog2",req.username)
			}
			next()
		})
	}

	else if (!req.cookies[cookieKey]) {
		return res.status(401).send('Cookie not found')
	} else {
		redis.hgetall(req.cookies[cookieKey], function (err, ele) {
			if (ele) {
				req.username = ele.username
				next()
			} else {
				return res.status(401).send()
			}
		})
	}
}

passport.serializeUser(function (user, done) {
	done(null, user.id)
})

passport.deserializeUser(function (id, done) {
	User.findOne({ fbId: id }).exec(function (err, user) {
		done(null, user)
	})
})

passport.use(new FacebookStrategy(config,
	function (token, refreshToken, profile, done) {
		const profileSet = profile.displayName.split(' ')
		const username = profileSet.join('') + "@facebook"
		User.findOne({ username: username }).exec(function (err, element) {
			if (!element) {
				new User({ username: username, fbId: profile.id }).save()
				new Profile({
					username: username, dob: "01-11-1990", email: "sdf@sds.ss",
					zipcode: '77030', avatar: undefined, following: [],
					headline: 'Facebook Yeah'
				}).save()
			}
			return done(null, profile)
		})
	}))


function profile(req, res) {
	res.send('ok now what?', req.user)
}

function fail(req, res) {
	res, send('Failed to login')
}

//Register a new user with the system
function register(req, res) {
	var username = req.body.username
	var dob = new Date(req.body.birth)
	var email = req.body.email
	var zipcode = req.body.zipcode
	var password = req.body.password
	if (!req.body.username || !req.body.password) {
		res.status(400).send('Input incomplete')
		return
	}
	User.find({ username: username }).exec(function (err, elements) {
		if (elements.length > 0) {
			res.status(401).send(`${username} already exists`)
			return
		}
		else {
			var newSalt = md5((new Date()).getTime())
			var newUser = new User({
				username: username, salt: newSalt,
				hash: md5(password + newSalt)
			})
			var newProfile = new Profile({
				username: username, dob: dob, email: email,
				zipcode: zipcode, avatar: undefined, headline: 'A headline',
				following: []
			})

			newProfile.save(function (err, elements) {
				if (err) {
					console.log(err)
					return
				}
			})

			newUser.save(function (err, elements) {
				if (err) {
					console.log(err)
					return
				}
				res.send({
					username: req.body.username,
					status: 'success'
				})
			})
		}
	})
}

//log in to server, sets session id and hash cookies
function login(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {

		res.status(400).send("Username or password missing")
		return
	}
	User.find({ username: username }).exec(function (err, elements) {
		if (err) {
			console.log(err)
			return
		}

		if (elements.length == 0) {
			res.status(401).send("Haven't registered")
			return
		}

		var userObj = elements[0]
		if (userObj && (md5(password + userObj.salt) === userObj.hash)) {
			var sessionid = md5((new Date()).getTime * Math.random() + username)
			redis.hmset(sessionid, userObj)
			res.cookie(cookieKey, sessionid, { maxAge: 3600 * 1000, httpOnly: true })
			res.send({ username: username, status: 'success' })
		}
		else {
			res.status(401).send('Unauthorized')
			return
		}
	})
}

//would update the password for the loggedInUser
function putPassword(req, res) {
	var password = req.body.password
	var username = req.username
	if (!password) {
		res.status(400).send('No password input')
		return
	}
	else {
		User.find({ username: username }).exec(function (err, element) {
			if (err) {
				console.log(err)
				return
			}
			else {
				var oldname = element[0];
				if (md5(oldname.salt + password) === oldname.hash) {
					res.status(400).send("Password has not changed")
					return
				}
				else {
					var newsalt = md5((new Date()).getTime())
					User.update({ username: username }, {
						$set: {
							salt: newsalt,
							hash: md5(password + newsalt)
						}
					}, { new: true }, function (err, element) {
						if (err) throw err
						else {
							res.status(200).send('Password updated successfully')
							return
						}
					})
				}
			}
		})
	}
}

const linkLocal = (req, res) => {
	var username = req.body.localUser
	var password = req.body.localPsw
	if (!username || !password) {
		return res.status(400).send("Invalid input")
	}
	User.findOne({ username: username }).exec(function (err, element) {
		if (!element) {
			return res.status(400).send("No such account!")
		}
		else if (element.hash != md5(password + element.salt)) {
			return res.status(400).send("Password does not match")
		}
		User.update({ username: username }, {
			$addToSet:
			{ 'authorization': { 'facebook': req.username } }
		}, function () { })
		Profile.findOne({ username: username }).exec(function (err, profiles) {
			Profile.findOne({ username: req.username }).exec(function (err, fbInfo) {
				let localFollow = profiles.following
				if (fbInfo && fbInfo.following && fbInfo.following.length > 0) {
					fbInfo.following.map(user => {
						if (localFollow.indexOf(user) < 0) {
							localFollow.push(user)
						}
					})
				}
				Profile.update({ username: username }, { $set: { 'following': localFollow } }, function () { })
			})
		})
		Article.update({ author: req.username }, { $set: { 'author': username } },
			{ new: true, multi: true }, function () { })
		Comment.update({ author: req.username }, { $set: { 'author': username } },
			{ new: true, multi: true }, function () { })
		Article.update({ 'comments.author': req.username },
			{ $set: { 'comments.$.author': username } },
			{ new: true, multi: true }, function () {})
		return res.status(200).send("Linked successfully")
	})
}

// The function to unlink facebook account with regular account
const unlink = (req, res) => {
	const username = req.username
	User.findOne({ username: username }).exec(function (err, ele) {
		if (ele.authorization.length !== 0) {
			User.update({ username: username }, { $set: { authorization: [] } },
				{ new: true }, function () {
					return res.status(200).send("Unlinked successfully")
				})
		} else {
			return res.status(400).send("No such account")
		}
	})
}

const successFun = (req, res) => {
	res.redirect("http://stale-vein.surge.sh")
}

module.exports = {
	app: (app) => {
		app.use(session({ secret: 'dhfd' }))
		app.use(passport.initialize())
		app.use(passport.session())
		app.use(cookieParser())
		app.use('/facebook', passport.authenticate('facebook', { scope: 'email' }))
		app.use('/auth/callback', passport.authenticate('facebook',
			{ failureRedirect: '/fail' }), successFun)
		app.get('/fail', fail)
		app.get('/', hello)
		app.post('/register', register)
		app.post('/login', login)
		app.put('/password', putPassword)
		app.put('/logout', logout)
		app.post('/linklocal', isLoggedIn, linkLocal)
		app.get('/unlink', isLoggedIn, unlink)
	}, isLoggedIn
}
