var redis = require('redis')
.createClient("redis://h:p6a3cd6b5ecf2d72b185cbcc1aeb807dadc61eba2e84f68589d3d0f86549a4932@ec2-34-206-56-13.compute-1.amazonaws.com:45869")
var request = require('request')
var qs = require('querystring')
var express = require('express')
var cookieParser = require('cookie-parser')
var session =require('express-session')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var users = [];

const config = { 
    clientSecret: '8f03e7944369649bfd2e530ba98a8b67', 
    clientID: '1249125958488894', 
    callbackURL: 'http://localhost:3000/auth/callback' }

module.exports = app => {
    app.post('/register', register)
    app.post('/login', login)
    app.put('/password',putPassword)
    app.put('/logout', logoutDefault)

    app.use(session({secret:'thisIsMySecret'}))
	app.use(passport.initialize())
	app.use(passport.session())
    app.use(cookieParser())

	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', 
    {successRedirect:'/profile', failureRedirect:'/fail'}))
	app.use('/logout',logout)
	app.use('/profile',isLoggedIn,profile)
}


passport.serializeUser(function(user, done) {
	users[user.id] = user
	done(null, user.id)
})

passport.deserializeUser(function(id, done) {
	var user = users[id]
	done(null)
})

passport.use(new FacebookStrategy(config,
 function(token, refreshToken, profile, done) {
 	process.nextTick(function() {
 		return done(null, profile)
 	})
 }))

function logout(req, res) {
	req.logout();
	res.redirect('/')
}

function isLoggedIn(req,res, next) {
	var sid=req.cookies[cookieKey]
	if(!sid) {
		return res.status(401)
	}
	redis.hgetall(sid, function(err, userObj) {
        console.log(sid + 'mapped to' + userObj)
		if (userObj) {
            username = userObj.username
			next()
		} else {
			res.redirect('/login')
        }
	})	
}

function profile(req, res) {
	res.send('ok now what?', req.user)
}


function createUser(username, password) {
    var newSalt = md5((new Date()).getTime())
    users[username] = {username, hash: md5(password + newSalt), salt: newSalt}
}

function register (req, res) {
    if (!req.body.username || !req.body.password){
        res.status(400).send('Input incomplete')
        return
    }
    else if (users[req.body.username]){
        res.status(400).send('Already registered')
        return
    }
    createUser(req.body.username, req.body.password)
    res.status(200).send({
        username: User[req.body.username].username,
        result: 'success'
    })
}

function login  (req, res) {
    var username = req.body.username;
	var password = req.body.password;
	if(!username || !password){
		res.status(400).send("Username or password missing")
		return
	}
	var userObj = users[req.body.username]
	if(!userObj){
		res.status(401).send("Invalid user")
		return
	}
	if(userObj.hash == md5(password+userObj.salt)){
		var msg = {username:userObj.username, result: 'success'}
		res.send(msg)
	}
	else {
		res.status(401).send("Password error")
	} 
}


function logoutDefault (req, res) {
    res.status(200).send('Logged out')
}

function putPassword (req,res) {
	var msg = {username:'rx4', 
	        	  result:'password will not change'
	    }
    res.status(200).send(msg)
}


