var Article = require('./model.js').Article
var Comments = require('./model.js').Comments
var md5 = require('md5')

const getArticle = (req, res) => {
	if(req.params.id){
		Article.find({_id:req.params.id}).exec(function(err, elements){
            console.log(elements)
			if(elements === undefined || elements.length == 0){
				return res.status(400).send('No article')
			}
			else{
				res.status(200).send({articles:elements})
			}
		})
	}
	else{
		Article.find({}).exec(function(err, elements){
			if(err)
				{console.log(err)
                return}
			else
				return res.status(200).send({articles:elements})
		})
	}
}

const addArticle = (req, res) => {
    var text = req.body.text
    var img = 'https://cdn.spacetelescope.org/archives/images/wallpaper1/heic1509a.jpg'
    var newPost = new Article({author:req.username, 
		date: new Date(), text, img, comments:["biggest","sdfa"]})
	new Article(newPost).save(function(err, elements){
		if(err){
			console.log(err)
            return
        }
        else{
            return res.status(200).send({articles: [elements]})
        }
	})
}

const editArticle = (req, res) =>{
    Article.find({_id: req.params.id}).exec(function(err, elements){
        if (err ||elements === undefined|| elements.length == 0){
            console.log(err)
            res.status(400).send('No article')
            return
        }

        if (req.body.commentId){
            if (req.body.commentId == -1){
                console.log("dssag")
                var commId = md5(req.username + new Date().getTime())
                const newComment = new Comments({commentId: commId, author:req.username, 
                    date: new Date(), text: req.body.text})
                    new Comments(newComment).save(function(err, object){
                    if(err) throw err
                 })
                console.log(newComment)
                Article.findByIdAndUpdate(req.params.id, {$addToSet: {comments: newComment}},
                {upsert:true, new:true}, function(err, ele){})
                    Article.find({_id:req.params.id}).exec(function(err, ele){
                    res.status(200).send({articles: [[ele[0]]]})
            })
            }
            else{            
                Comments.find({commentId: req.body.commentId}).exec(function(err, element){
                    if(elements == undefined || elements.length === 0 ){
                        res.status(400).send("Comment not found")
                    }else if(element[0].author == req.username ){
                        Comments.update({commentId: req.body.commentId},
                            { $set: {text:req.body.text}}, {new:true}, function(err, item){})
                        Article.update({_id: req.params.id, 'comments.commentId':req.body.commentId},
                            {$set:{'comments.$.text':req.body.text}}, {new: true}, function(err, ele){})
                        Article.find({_id: req.params.id}).exec(function(err, ele){
                            res.status(200).send({articles: ele})
                        })
                    }
                })
            }
        }
        else{
            if(elements[0].author == req.username){
                Article.findByIdAndUpdate(id, {$set: {text:req.body.text}}, {new: true},
                    function(err, item){
                    res.status(200).send({articles: item})
                })
            }
        }


    })
}
module.exports = (app) => {
    app.put('/articles/:id', editArticle)
    app.get('/articles/:id*?',getArticle)
    app.post('/article', addArticle)
}

