let articles = [
    {id: 0, text:"asdfg", author:"rx4"},
    {id: 1, text:"dfggh", author:"Nicole"},
    {id: 2, text:"qwrte", author:"sunico"}
]

const getArticle = (req, res) => {
	if(req.params.id){
		res.status(200).send(articles.filter((article) => {
		return article.id == req.params.id
	}))
	}else{
		res.send(articles)
	}
}

const addArticle = (req, res) => {
	let article = {id: articles.length, 
				   author: "rx", text:req.body.text } 
	articles.push(article) 
	res.status(200).send(article)
}

const editArticle = (req, res) =>{
    articles[req.params.id].text = req.body.text
    res.status(200).send(articles[req.params.id])
}
module.exports = (app) => {
    app.put('/articles/:id/', editArticle)
    app.get('/articles/:id?',getArticle)
    app.post('/article', addArticle)
}

