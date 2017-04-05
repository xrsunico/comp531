import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

describe('Validate Authentication', () => {
    let Action, resource, url, login, logout
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({ warnOnUnregistered: false, useCleanCache: true })
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        Action = require('../../actions').default
        resource = require('../../actions').default
        url = require('../../actions').url
        login = require('./authActions').login
  		logout = require('./authActions').logout

    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should log in a user', (done) => {
        const username = 'rx4'
        const password = 'calm-engine-cage'

        mock(`${url}/login`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            json: { username, result: 'success' }
        })
        login(username, password)(
            (action) => {
                if (action.type === Action.LOGIN) {
                expect(action.username).to.eql(username)
                done()
                }
            })
    })

    it('should not log in an invalid user', (done) => {
        const username2 = 'ab!@'
        const password2 = 'qwertyu'

        mock(`${url}/login`, {
            method: 'POST', headers: { 'Content-Type': 'text/plain'},
            status: 401, statusText: 'Unauthorized'
        })

        login(username2, password2)(
            (action) => {
                expect(action).to.eql({ type: 'ERROR', errMsg: 'Error login' })
                done()
        })
    })

    it('should log out a user', (done) => {
        mock(`${url}/logout`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        })

        logout()(
            (action) => {
                    expect(action.type === Action.LOGOUT || action.type === Action.NAV2LANDING).to.be.true
            })
             done()
    })
})