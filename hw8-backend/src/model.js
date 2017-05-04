var mongoose = require('mongoose')
require('./db.js')

//user schema
var userSchema = new mongoose.Schema({
	authorization:[],
	username: String, 
	fbId:String,
    salt:String,
	hash:String
})

//comment schema
var commentSchema = new mongoose.Schema({
	commentId: String,
	author: String,
    text: String,
	date: Date
})

// article schema
var articleSchema = new mongoose.Schema({
	id: String,
	author: String,
	text: String,
    date: Date,
    img: String, 
	comments: [ commentSchema ]
})

//profile schema
var profileSchema = new mongoose.Schema({
	username: String,
	headline: String,
	following: [String],
	email: String,
	zipcode: String,
	avatar: String,
    dob: String
})

exports.User = mongoose.model('users', userSchema)
exports.Article = mongoose.model('articles', articleSchema)
exports.Profile = mongoose.model('profile', profileSchema)
exports.Comments = mongoose.model('comments', commentSchema)