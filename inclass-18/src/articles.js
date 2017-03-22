let articles = [
    {id: 1, text:"asdfg", author:"rx4"},
    {id: 2, text:"dfggh", author:"Nicole"},
    {id: 3, text:"qwrte", author:"sunico"}
]

const getArticle = (req, res) => {
	console.log(articles)
	if(req.params.id){
		res.send(articles.filter((article) => {
		return article.id == req.params.id
	}))
	}else{
		res.send(articles)
	}
}

const addArticle = (req, res) => {
	let article = {id: articles.length + 1, 
				   author: "rx", text:req.body.text } 
	articles.push(article) 
	res.send(article)
}

module.exports = (app) => {
    app.get('/articles/:id?',getArticle)
    app.post('/articles', addArticle)
}

