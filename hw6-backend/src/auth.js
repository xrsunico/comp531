var User = [{username: 'rx4', password:'qwer'}]

const register = (req, res) => {
	if(!req.body.username || !req.body.password){
		res.status(400).send('Register information incomplete');
		return;
	}
	User.push({username : req.body.username, password: req.body.password});
	res.send('Registered successfully');
}

const login = (req, res) => {
	let username = req.body.username
	let password = req.body.password
	if(!username || !password) {
		res.status(400).send('Missing input')
		return
	}else{
		res.send('Successfully logged in')
	}
}

const logout = (req, res) => {
	res.send('Logged out')
}

const putPassword = (req,res) =>{
	let password = req.body.password
	if(!password){
		res.status(400).send('Missing password')
		return
	}
	else {
		res.status(200).send( 'Password not change')
	}

}
module.exports = app => {
     app.post('/register', register)
     app.post('/login', login)
     app.put('/logout', logout)
	 app.put('/password', putPassword)
}
