import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, driver } from './selenium'
import common from './common'

describe('Test Dummy Server Profile Page', () => {

    before('should log in and navigate', (done) => {
        go().then(common.login)
        sleep(2000)
        .then(findId('profile').click())
        .then(sleep(500))
        .then(done)
    })

    it('should update the user email and verify', (done) =>{
    	let newE = 'rx@rice.edu'
    	sleep(200)
    	.then(findId('newEmail').sendKeys(newE))
        .then(sleep(300))
    	.then(findId('updateBtn').click())
        .then(sleep(2000))
    	.then(findId('emailUpdate').getInnerHtml()
    		.then(text => {
    			expect(text).to.equal(newE)
    		})
    	.then(done))
    })

    it('should update the zipcode and verify', (done) =>{
    	let newZ = '77030'
    	sleep(200)
    	.then(findId('newZip').sendKeys(newZ))
        .then(sleep(200))
    	.then(findId('updateBtn').click())
        .then(sleep(500))
    	.then(findId('zipUpdate').getInnerHtml()
    		.then(text => {
    			expect(text).to.equal(newZ)
    		})
    	.then(done))
    })

    it('should update the password and verify a "will not change" '+
    	'message is returned', (done) =>{
    	let newP = 'qwerty'
    	let newPc = 'qwerty'
    	sleep(200)
    	.then(findId('newPsw').sendKeys(newP))
    	.then(findId('newPwc').sendKeys(newPc))
        .then(sleep(200))
    	.then(findId('updateBtn').click())
        .then(sleep(2000))
    	.then(findId('profileSuc').getText()
    		.then(text => {
    			expect(text).to.equal('Password will not change')
    		})
    	.then(done))
    })
})