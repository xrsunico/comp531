const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
const url = path => `http://localhost:3000${path}`

describe('Validate Profile', () => {
	let lastHeadline
    let newHeadline = "update a new headline"
	it('should GET headlines', (done) => {
		fetch(url('/headlines'),
            {method: 'GET',
            headers: {'Content-Type': 'application/json'}
            })
		.then(r => {
			expect(r.status).to.eql(200)
			return r.json()
		})
		.then(body => {
			lastHeadline = body.headline
		})
        .then(done)
        .catch(done)
    },200)

    it('should POST a new article', (done) => {
		fetch(url('/headline'), 
			{method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body : JSON.stringify({headline: newHeadline})})
		.then((r) => {
			expect(r.status).to.eql(200)
			return r.json()
		})
        .then(body =>{
            expect(body.headline).to.eql(newHeadline)
        })
        .then(done)
        .catch(done)
    },200)

    it('should GET headline for rx', (done) => {
		fetch(url('/headlines/rx'),
            {method: 'GET',
            headers: {'Content-Type': 'application/json'}
            })
		.then(r => {
			expect(r.status).to.eql(200)
			return r.json()
		})
		.then(body => {
            console.log(body)
			expect(body[0].headline).to.be.ok
            expect(body[0].user).to.eql('rx')
		})
		.then(done)
		.catch(done)
	})
}, 200)

