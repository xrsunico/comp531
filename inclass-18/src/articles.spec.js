/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		// IMPLEMENT ME
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()			
		})
		.then(body => {
			expect(JSON.parse(body).length>=3).to.be.true
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		fetch(url("/articles"), {
            method:'POST',
            headers:new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({"text":"add a new article"})
        })
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()				
		})
		.then(body => {
            expect(JSON.parse(body).id).to.exit
            let newId = JSON.parse(body).id
			expect(JSON.parse(body)).to.eql({id: newId, author: "rx", 
                text: "add a new article"})
		})
		.then(
            fetch(url("/articles"), {
                method:'POST',
                headers:new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({"text":"add a new article2"})
            })
            .then(res => {
                expect(res.status).to.eql(200)	
                return res.text()				
            })	
            .then(body => {
                expect(JSON.parse(body)).to.eql({id: newId+1, author:"rx",
                    text: "add a new article2"})
            })
		)
		.then(done)
		.catch(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			fetch(url("/articles/" + JSON.parse(body)[1].id))
			.then(res => {
				expect(res.status).to.eql(200)	
				return res.text()
			})
			.then(body => {
				expect(JSON.parse(body).length==1).to.be.true
			})
		})
		.then(done)
		.catch(done)
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url("/articles/9999"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()				
		})
		.then(body => {
			expect(JSON.parse(body)).to.eql([])
		})		
		.then(done)
		.catch(done)
	}, 200)

});
