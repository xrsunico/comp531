const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
const url = path => `http://localhost:3000${path}`

describe('Validate Article', () => {
	let articleLen
	it('should GET articles', (done) => { 
		fetch(url('/articles'),
			{method: 'GET',
			credentials: 'include',
			headers: {'Content-Type': 'application/json'}
			})
		.then(r => {
			expect(r.status).to.eql(200)	
			return r.json()
		})
		.then(body => {
			articleLen = eval(body).length
			expect(articleLen).to.at.least(3)
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should POST a new article', (done) => {
		let id;
		fetch(url('/article'), 
			{method:'POST', 
			credentials: 'include',
			headers:{'Content-Type': 'application/json'},
			body : JSON.stringify( { text : "post a new article" } )})
		.then((r) => {
			expect(r.status).to.eql(200)	
			return r.json()
		})
		.then((body) => {
			expect(body.text).to.eql("post a new article")
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should increase the number of articles by one', (done) => {
		fetch(url('/articles/'),
			{method: 'GET',
			credentials: 'include',
			headers: {'Content-Type': 'application/json'}
			})
		.then(r => {
			expect(r.status).to.eql(200)	
			return r.text()
		})
		.then(body => {
			expect(eval(body).length).to.eql(articleLen + 1)
		})
		.then(done)
		.catch(done)
	}, 200)
});