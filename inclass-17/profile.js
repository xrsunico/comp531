
const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadlines = (req, res) => {
	res.send({ headlines: [{
		username: 'rx4',
		headline: 'Happy'
	}]})
}

const putHeadline = (req, res) => {
	res.send({
		username: 'rx4',
		headline: req.body.headline || 'None'
	})
}

const getEmail = (req, res) => {
	res.send({
		username: 'rx4',
		email: 'asdf@as.df'
	})
}

const putEmail = (req, res) => {
	res.send({
		username: 'rx4',
		email: req.body.email || 'None'
	})
}
const getZipcode = (req, res) => {
	res.send({
		username: 'rx4',
		zipcode: '77030'
	})
}
const putZipcode = (req, res) => {
	res.send({
		username: 'rx4',
		zipcode: req.body.zipcode || 'None'
	})
}

const getAvatars = (req, res) => {
	res.send({
		username: 'rx4',
		avatar: '123.jpg'
	})
}

const putAvatar = (req, res) => {
	res.send({
		username: 'rx4',
		avatar: req.body.avatar || 'None'
	})
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
}
