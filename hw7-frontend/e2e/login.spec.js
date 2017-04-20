import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Dummy Server Landing Page', () => {

    before('should log in', (done) => {
        go().then(done)
    })

    it('should register a new user', (done) => {
        sleep(500)
        .then(findId('regname').sendKeys('testname'))
        .then(findId('email').sendKeys('test@email.com'))
        .then(findId('dob').sendKeys('1212-11-22'))
        .then(findId('phone').sendKeys('111-111-1111'))
        .then(findId('zipcode').sendKeys('12345'))
        .then(findId('psw').sendKeys('11'))
        .then(findId('pwc').sendKeys('11'))
        .then(findId('register').click())
        .then(sleep(8000))
        .then(findId('successMsg').getText().then(text=>{
            expect(text).to.eql('Congratulations! Registered successfully!')
        }))
        .then(done)
    })

    it('should log in as your test user', (done) => {
        let logName = common.creds.username
        sleep(500)
        .then(common.login)
        .then(sleep(6000))
        .then(findId('mainName').getText().then(text=>{
            expect(text).to.eql(logName)
        })
        .then(done))
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
