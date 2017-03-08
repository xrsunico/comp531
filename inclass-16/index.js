
const express = require('express')
const bodyParser = require('body-parser')

let articles = [
{
	id: 1,
	author: "Ran Xu",
	text: "Hello world"
	},
 {	
	id: 2,
	author: "Sebstian Stan",
	text: "Winter Soldier"
	},
	{
	id: 3,
	author: "Collin Firth",
	text: "Mr Darcy"
}]

const addArticle = (req, res) => {
     console.log('Payload received', req.body)   
     let newArticle = {"id": articles.length + 1, "author": "Bat Man", 
     "text":req.body}
     articles.push(newArticle)
     res.send(newArticle)
}

const getArticle = (req, res) => {
	res.send(articles)
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/articles', getArticle)
app.get('/', hello)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
