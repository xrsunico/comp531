import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
import { expect } from 'chai'
import Action, { nav2Main, nav2Landing, nav2Profile, showError, showSuccess } from './actions'

describe('Validate actions ', () => {
    let Action, resource, url
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({ warnOnUnregistered: false, useCleanCache: true })
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        Action = require('./actions').default
        resource = require('./actions').resource
        url = require('./actions').url
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('resource should be a resource ', (done) => {
        mock(`${url}/resource`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            json: { msg: 'msg'}
        })

        resource('GET', 'resource').then((response) => {
            expect(response.msg).to.eql('msg')
        })
        done()
    })

    it('resource should give me the http error', (done) => {
        resource('GET', 'err').catch((err) => {
            expect(err).to.exist
        })
        done()
    })

    it('resource should be POSTable', (done) => {
        mock(`${url}/resource`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            json: { msg1: 'asd', msg2: 'qwe' }
        })
        resource('POST', 'resource', { msg1: 'asdf', msg2: 'qwer' })
            .then((response) => {
                expect(response).to.eql({ msg1: 'asd', msg2: 'qwe' })
                done()
            })
    })

    it('should update error message', (done) => {
        let errTest = 'new error';
        expect(showError(errTest)).to.eql({ 
            type: Action.ERR, errMsg: errTest 
        })
        done()
    })

    it('should update success message', (done) => {
        let sucTest = 'new success';
        expect(showSuccess(sucTest)).to.eql({
            type: Action.SUCCESS, sucMsg: sucTest 
        })
        done()
    })

    it('should navigate', (done) => {
        expect(nav2Landing()).to.eql({ type: Action.NAV2LANDING })
        expect(nav2Main()).to.eql({ type: Action.NAV2MAIN })
        expect(nav2Profile()).to.eql({ type: Action.NAV2PROFILE })
        done()
    })

})