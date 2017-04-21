var md5 = require('md5')
var redis = require('redis')
.createClient("redis://h:p43d0afd2c59d46379608c96285e4a7890400df637a5e60190a83e3f21772dcc2@ec2-34-206-56-140.compute-1.amazonaws.com:29939")
var User = require('./model').User
var Profile = require('./model').Profile
var users = [];
var cookieKey = 'sid'

const config = { 
    clientSecret: '8f03e7944369649bfd2e530ba98a8b67', 
    clientID: '1249125958488894', 
    callbackURL: 'http://localhost:3000/auth/callback' }

module.exports = app => {
    app.post('/register', register)
///console.log('adding login', login)
    app.post('/login', login)
	app.use(isLoggedIn)
    app.put('/password',putPassword)
    app.put('/logout', isLoggedIn, logout)
	app.use('/logout',logout)
	app.use('/profile',isLoggedIn,profile)
}


function logout(req, res) {
	redis.del(req.cookies[cookieKey])
    res.clearCookie(cookieKey)
	res.status(200).send("OK")	
}

function isLoggedIn ( req,res, next) {
	var sid=req.cookies[cookieKey]
	if(!sid) {
		return res.status(401)
	}
    //console.log(sid + 'mapped to')
	redis.hgetall(sid, function(err, userObj) {
		if (userObj) {
            req.username = userObj.username
            //console.log(sid + 'mapped to' + username)
			next()
		} else {
			res.redirect('/login')
			res.status(401)
        }
	})	
}

function profile(req, res) {
	res.send('ok now what?', req.user)
}

function fail(req, res) {
	res,send('Failed to login')
}

function register (req, res) {
	var username = req.body.username
    var dob = new Date(req.body.birth)
    console.log(dob)
    var email = req.body.email
    var zipcode = req.body.zipcode
    var password = req.body.password
    if (!req.body.username || !req.body.password){
        res.status(400).send('Input incomplete')
        return
    }
    User.find({username: username}).exec(function(err, elements){
        if (elements.length > 0){
            res.status(401).send(`${username} already exists`)
            return
        }
        else{
            var newSalt = md5((new Date()).getTime())
            var newUser = new User({username: username,salt: newSalt, 
				hash: md5(password + newSalt)})
            var newProfile = new Profile({ username: username, dob: dob, email: email, 
				zipcode: zipcode, avatar: undefined, headline: 'A headline' })

            newProfile.save(function(err, elements){
                if (err){
                    console.log(err)
                    return
                }
                console.log('Profile saved successfully')
            })

            newUser.save(function(err, elements){
                if (err){
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

function login  (req, res) {
    var username = req.body.username;
	var password = req.body.password;
    // console.log("username")
    // console.log(req.username)
	if(!username || !password){
        
		res.status(400).send("Username or password missing")
		return
	}
	User.find({username: username}).exec(function(err, elements){
        if (err){
            console.log(err)
            return
        }

        if (elements.length == 0){
            res.status(401).send("Haven't registered")
            return
        }

        var userObj = elements[0]        
        if (userObj && (md5(password + userObj.salt) === userObj.hash)){
            var sessionid = md5((new Date()).getTime * Math.random() + username)
            redis.hmset(sessionid, userObj)
			res.cookie(cookieKey, sessionid, {maxAge: 3600*1000, httpOnly: true})
            res.send({username:username, status:'success'})
        }
        else{
            res.status(401).send('Unauthorized')
            return
        }
    })
}

function putPassword (req,res) {
	var password = req.body.password
	var username = req.username
	if(!password){
		res.status(400).send('No password input')
		return
	}
	else {
		User.find({username:username}).exec(function(err,element){
			if(err){
				console.log(err)
				return
			}
			else{
                console.log(element)
                var oldname = element[0];
				if(md5(oldname.salt+password) === oldname.hash){
					res.status(400).send("Password has not changed")
					return
				}	
                else{
				var newsalt = md5((new Date()).getTime())
				User.update({username: username}, { $set: { salt: newsalt, 
					hash:md5(password+newsalt)}}, { new: true }, function(err, element){
                        if(err) throw err
                        else{
                            res.status(200).send('Password updated successfully')
					        return
                        }
				    })	
                }		
			}
		})
	}
}


