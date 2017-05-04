const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser') 

const app = express()


const corsMiddleware = (req, res, next)=>{
	const origin = req.headers.origin ?  req.headers.origin : "*"
	res.header("Access-Control-Allow-Origin", req.headers.origin)
	res.header("Access-Control-Allow-Credentials", true)
	res.header("Access-Control-Allow-Methods", 'POST, PUT, GET, DELETE, OPTIONS')
	res.header("Access-Control-Allow-Headers", 'Authorization, Content-Type, X-Request-With, X-Session-Id')
	if(req.method === 'OPTIONS') {
    	res.sendStatus(200)
    } else {
    	next()
    }
}

app.use(bodyParser.json())

app.use(cookieParser())

app.use(corsMiddleware)


const isLoggedIn=require('./src/auth').isLoggedIn
require('./src/auth').app(app)
app.use(isLoggedIn)

require('./src/profile')(app)
require('./src/articles')(app)
require('./src/following')(app)

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
