import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
// import {fetchAvatar, fetchEmail, fetchZipcode, } from './profileActions'

describe('Validate Profile actions', () => {

  let Action, url, resource, actions
	beforeEach(() => {
  		if (mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
      Action = require('../../actions').default
      actions = require('./profileActions')
        url = require('../../actions').apiUrl
        resource = require('../../actions').resource
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
	  	}
	})

  it('should fetch the user profile information', (done) => {

      mock(`${url}/avatar/a`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        json: { item :'as', avatar: '123.jpg' }
      })  
      
      mock(`${url}/email/a`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        json: { item: 'a',email: 'sss@ss.ss' }
      })

      mock(`${url}/password/a`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        json: {item:'a', password: 'asdf' }
      })

      mock(`${url}/zipcode/a`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        json: { item:'a', zipcode: '12345' }
      })  

       actions.fetchAvatar('a')
        ((action)=>{
			    expect(action.avatar).to.eql('123.jpg')})
		  actions.fetchEmail('a')
        ((action)=>{
		    	expect(action.email).to.eql('sss@ss.ss')})
		  actions.fetchZipcode('a')
        ((action)=>{
			    expect(action.zipcode).to.eql('12345')
			
		})
		done()
  	})
  

    it('should update headline', (done) => {
		
		const username = 'rx4test'
		const headline = 'a new headline'
  		mock(`${url}/headline`, {
  			method: 'PUT',
  			headers: {'Content-Type':'application/json'},
  			json: { username, headline}
  		})
	    actions.updateHeadline('asdg')
      ((action) => {
            expect(action).to.eql({type:Action.UPDATE_PROFILE,headline})
                
        })
        done()
	})
	
})