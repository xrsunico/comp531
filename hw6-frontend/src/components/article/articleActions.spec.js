import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

describe('Validate Article actions', () => {
	let resource, Action, url, updateKeyword, fetchArticles
	beforeEach(() => {
		if (mockery.enable) {
			mockery.enable({ warnOnUnregistered: false, useCleanCache: true })
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
		}
		resource = require('../../actions').default
		Action = require('../../actions').default
		url = require('../../actions').url
        updateKeyword = require('./articleActions').updateKeyword
		fetchArticles = require('./articleActions').fetchArticles
	})

	afterEach(() => {
		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
		}
	})

	it('should fetch articles', (done) => {
        const articles = [
                { _id: 1, author: 'rx', text: "asdf", img:"http://lorempixel.com/311/308/",
                date:"2017-3-22", comments: []},
                { _id: 2, author: 'rx', text: "wert", "img":"http://lorempixel.com/377/300/",
                date:"2017-2-22", comments: [] }]
		mock(`${url}/articles`, {
			method: 'GET', headers: { 'Content-Type': 'application/json' },
			json: { articles }
		})

		fetchArticles()((action) => {
			expect(action).to.eql({type:Action.UPDATE_ARTICLE, articles})
			done()
		})
	})

	it('should update the search keyword', () => {
		const keyword = 'a new keyword'
		expect(updateKeyword(keyword)).to.eql({type: Action.UPDATE_KEYWORD, keyword})
	})
})