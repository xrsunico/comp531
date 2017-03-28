import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

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
      
      mock(`${url}/email/a`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { item: 'a',email: 'sss@ss.ss' }
      })

		  actions.fetchEmail('a')
        ((action)=>{
		    	expect(action).to.eql({type: Action.UPDATE_PROFILE, email:'sss@ss.ss'})})
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