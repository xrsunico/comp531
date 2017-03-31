const md5 = require('md5')
const cookieParser = require('cookie-parser')

const cookieKey = 'sid'
const user:{users:[]}

function register(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {
		res.sendStatus(400).send("Username or password missing")
		return
	}
	const salt = Math.random()*1000;
	const hash = md5(password + salt);
	user.users.push({username : username, salt : salt, hash: hash});
	res.send({users: [{username: username, salt: salt, hash: hash}]})
}

function login(req, res){
	var username = req.body.username;
	var password = req.body.password;
	if(!username || !password){
		res.sendStatus(400).send("Username or password missing")
		return
	}
	var userObj = getUser(username)
	if(!userObj){
		res.sendStatus(401).send("Invalid user")
		return
	}
	if(userObj.hash===md5(password+userObj.salt)){
		res.cookie(cookieKey, generateCode(userObj),
		{maxAge: 3600*1000, httpOnly: true})
		var msg = {username:username, result: 'success'}
		res.send(msg)
	}
	else {
		res.sendStatus(401).send("Password error")
	}
}

function getUser(username){
	return user.users.filter(u => { return u.username == ''+ username})[0]
}

function generateCode(userObj){
	return Math.floor(Math.random()*1000)
}

module.exports = app => {
	app.use(cookieParser());
	app.post('/register', register)
	app.post('/login',login)
}