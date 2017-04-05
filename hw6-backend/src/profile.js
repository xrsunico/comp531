const headlines = [
	{user: 'rx', headline: 'sample headline'},
	{user:'Scott', headline: '1234'},
	{user: 'bla', headline:'blablabla'}
]

const emails = [
	{user:'rx', email:'123@12.12'},
	{user:'Scott', email:'sktop@ee.edu'},
	{user:'bla', email:'blabla@bla'}
]

const zipcodes = [
	{user:'rx', zipcode:'12121'},
	{user:'Scott', zipcode:'12111'},
	{user:'bla', zipcode:'11111'}
]

const avatars = [
	{user:'rx', avatar:'sdf.jpg'},
	{user:'Scott', avatar:'123.jpg'},
	{user:'bla', avatar:'bla.jpg'}
]

const dobs = [
	{user:'rx', dob:'1991-11-11'},
	{user:'Scott', dob:'1990-01-01'},
	{user:'bla', dob:'1998-11-11'}
]

const index = (req, res) => {
     res.status(200).send({ hello: 'world' })
}

const getHeadlines = (req, res) => {
	if(req.params.user){
		res.send(headlines.filter((headline) => {
		return headline.user == req.params.user
	}))
	}else{
		res.status(200).send(headlines[0])
	}
}

const putHeadline = (req, res) => {
	if (!req.user) req.user = 'rx'
	headlines[req.user] = req.body.headline
	res.status(200).send({user: req.user, headline: headlines[req.user]})
}

const getEmail = (req, res) => {
	if(req.params.user){
		res.send(emails.filter((email) => {
		return email.user == req.params.user
	}))
	}else{
		res.status(200).send(emails[0])
	}
}

const putEmail = (req, res) => {
	if (!req.user) req.user = 'rx'
	emails[req.user] = req.body.email
	res.status(200).send({user: req.user, email: emails[req.user]})
}
const getZipcode = (req, res) => {
	if(req.params.user){
		res.send(zipcodes.filter((zipcode) => {
		return zipcode.user == req.params.user
	}))
	}else{
		res.status(200).send(zipcodes[0])
	}
}
const putZipcode = (req, res) => {
	if (!req.user) req.user = 'rx'
	zipcodes[req.user] = req.body.zipcode
	res.status(200).send({user: req.user, zipcode: zipcodes[req.user]})
}

const getAvatars = (req, res) => {
	if(req.params.user){
		res.send(avatars.filter((avatar) => {
		return avatar.user == req.params.user
	}))
	}else{
		res.status(200).send(avatars[0])
	}
}

const putAvatar = (req, res) => {
    if (!req.user) req.user = 'rx'
	avatars[req.user] = req.body.avatar
	res.status(200).send({user: req.user, avatar: avatars[req.user]})
}

const getDobs = (req, res) => {
	if(req.params.user){
		res.send(dobs.filter((dob) => {
		return dob.user == req.params.user
	}))
	}else{
		res.status(200).send(dobs[0])
	}
}
module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', getHeadlines)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', putAvatar)
	 app.get('/dobs/:user?', getDobs)
}
