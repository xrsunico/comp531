// this is model.js
var mongoose = require('mongoose')
require('./db.js')

var userSchema = new mongoose.Schema({
	username: String, 
    salt:String,
	hash:String
})

var commentSchema = new mongoose.Schema({
	commentId: Number,
	author: String,
    text: String,
	date: Date
})

var articleSchema = new mongoose.Schema({
	id: Number,
	author: String,
	text: String,
    date: Date,
    img: String, 
	comments: [ commentSchema ]
})

var profileSchema = new mongoose.Schema({
	username: String,
	headline: String,
	following: [String],
	email: String,
	zipcode: String,
	avatar: String,
    dob: Date
})

exports.User = mongoose.model('users', userSchema)
exports.Article = mongoose.model('articles', articleSchema)
exports.Profile = mongoose.model('profile', profileSchema)
exports.Comments = mongoose.model('comments', commentSchema)