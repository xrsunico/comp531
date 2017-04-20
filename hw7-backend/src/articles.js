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
                var commId = new ObjectId()
                const newComment = new Comments({commentId: commId, author:req.user, 
                    date: new Date(), text: req.body.text})
                var comm = articles[0].comments
                comm.push(newComment)

                Article.update({_id: elements[0]._id}, {$set: {comments: comm}}, function(err, ele){
                    console.log(ele)
                    if (err){
                        console.log(err)
                        return
                    }
                    Article.find({_id: req.params.id}).exec(function(exception, ele){
                        res.status(200).send({articles: [ele[0]]})        
                        return
                    })      
                })
            }
            else{            
                Article.update({_id: elements[0]._id, 'comments.commentId' : req.body.commentId}, 
                {$set: {'comments.$.text':req.body.text}}, function(err, ele){
                    if (err){
                        console.log(err)
                        return
                    }
                    Article.find({_id: elements[0]._id}).exec(function(exception, ele){
                        res.status(200).send({articles: [ele[0]]})        
                        return
                    })                
                })
            }
        }
        else{
            Article.update({_id: elements[0]._id}, {$set: {text : req.body.text}}, function(err){
                if (err){
                    console.log(err)
                    return
                }
                Article.find({_id: elements[0]._id}).exec(function(exception, ele){
                        res.status(200).send({articles: [ele[0]]})        
                        return
                    }) 
            })
        }


    })
}
module.exports = (app) => {
    app.put('/articles/:id/', editArticle)
    app.get('/articles/:id*?',getArticle)
    app.post('/article', addArticle)
}

