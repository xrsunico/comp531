var Article = require('./model.js').Article
var User = require('./model.js').User
var Comments = require('./model.js').Comments
var Profile = require('./model.js').Profile
var md5 = require('md5')
var uploadImage = require('./uploadCloudinary.js').uploadImage

const getArticle = (req, res) => {
	//if articleId is supplied, return articles for the requested user
	if (req.params.id) {
		Article.find({ _id: req.params.id }).exec(function (err, elements) {
			if (elements === undefined || elements.length == 0) {
				User.find({ _id: req.params.id }).exec(function (err, ele) {
					if (ele == undefined || ele.length == 0) {
						return res.status(400).send('There is no such articleid')
					} else {
						Article.find({ author: ele[0].username })
							.exec(function (err, item) {
								if (item === undefined || item.length == 0) {
									res.status(400)
										.send('Cannot find any article for this user')
									return
								}
								else {
									res.status(200).send({ articles: item })
								}
							})
					}
				})
			}
			else {
				res.status(200).send({ articles: elements })
			}
		})
	}
	//if articleId is not supplied, return all articles
	else {
		Article.find({}).exec(function (err, all) {
			if (err) {
				console.log(err)
				return
			}
			else {
				Profile.find({ username: req.username }).exec(function (err, elements) {
					if (elements === undefined || elements.length == 0) {
						res.status(400).send('Invalid username: no such user')
						return
					}
					else {
						var users = elements[0]
						var userfeed = [req.username, ...users.following]
						Article.find({ author: { $in: userfeed } }).sort('-date').limit(10)
							.exec(function (err, ele) {
								if (err) {
									console.log(err)
									return
								}
								else {
									res.status(200).send({ articles: ele })
									return
								}
							})
					}
				})
			}
		})
	}
}

const addArticle = (req, res) => {
	var text = req.body.text
	var img = req.fileurl
	var newPost = new Article({
		author: req.username,
		date: new Date(), text, img, comments: []
	})
	new Article(newPost).save(function (err, elements) {
		if (err) {
			console.log(err)
			return
		}
		else {
			return res.status(200).send({ articles: [newPost] })
		}
	})
}

const editArticle = (req, res) => {
	Article.find({ _id: req.params.id }).exec(function (err, elements) {
		//Check if article :id corresponds with articles in database
		if (err || elements === undefined || elements.length == 0) {
			console.log(err)
			res.status(400).send('User does not own the article')
			return
		}

		else if (req.body.commentId) {
			//If commentId is -1, then a new comment is posted with the text message
			if (req.body.commentId == -1) {
				var commId = md5(req.username + new Date().getTime())
				var newComment = new Comments({
					commentId: commId, author: req.username,
					date: new Date(), text: req.body.text
				})
				new Comments(newComment).save(function (err, object) {
					if (err) throw err
				})
				Article.findByIdAndUpdate(req.params.id,
					{ $addToSet: { comments: newComment } },
					{ upsert: true, new: true }, function (err, ele) { })
				Article.find({ _id: req.params.id }).exec(function (err, ele) {
					res.status(200).send({ articles: [[ele[0]]] })
				})
			}
			// If commentId is supplied, then update the requested comment on 
			//the article, if owned
			else {
				Comments.find({ commentId: req.body.commentId }).exec(function (err, element) {
					if (element == undefined || element.length === 0) {
						res.status(400).send("Comment not found")
					} else if (element[0].author == req.username) {
						Comments.update({ commentId: req.body.commentId },
							{ $set: { text: req.body.text } }, { new: true }, function (err, item) { })
						Article.update(
							{ _id: req.params.id, 'comments.commentId': req.body.commentId },
							{ $set: { 'comments.$.text': req.body.text } }, { new: true },
							function (err, ele) { })
						Article.find({ _id: req.params.id }).exec(function (err, ele) {
							res.status(200).send({ articles: ele })
						})
					}
				})
			}
		}
		//Update the article :id with a new text if commentId is not supplied
		else {
			if (elements[0].author == req.username) {
				Article.findByIdAndUpdate(req.params.id, { $set: { text: req.body.text } }, 
				{ new: true },
					function (err, item) {
						res.status(200).send({ articles: item })
					})
			}
		}


	})
}
module.exports = (app) => {
	app.put('/articles/:id', editArticle)
	app.get('/articles/:id*?', getArticle)
	app.post('/article', uploadImage('img'), addArticle)
}
