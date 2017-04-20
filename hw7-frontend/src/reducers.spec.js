import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
import {filterArticles} from './components/article/searchArticle'

describe('Validate Reducer', () =>{
    let Action, Reducer
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({ warnOnUnregistered: false, useCleanCache: true })
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        Action = require('./actions').default
        Reducer=require('./reducers').default
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })
    const initState = {
        common: {location: 'LANDING', sucMsg: '',errMsg: ''},
        article: {articleID: 0, articles: [], keyword:''},
        follow: {},
        profile: {username: "", email: "", birth: "",phone: "",zipcode: "", 
        avatar: undefined, password: "", headline: "", pwconf: ""}
    }
    it('should initialize state', ()=>{
        expect(Reducer(undefined,{})).to.eql(initState)
    })

    it('should state success', ()=>{
        const sucMsg = 'new success'
        expect(Reducer(undefined, {type: Action.SUCCESS, sucMsg:sucMsg}))
        .to.eql({...initState,common:{location:'LANDING', sucMsg:'new success',errMsg:''}})
    })
    
    it('should state error', ()=>{
        const errMsg = 'new error'
        expect(Reducer(undefined, {type: Action.ERR, errMsg:errMsg}))
        .to.eql({...initState, common:{location:'LANDING', errMsg:'new error', sucMsg:''}})
    })

    let articleTest = [{_id:1, text:'asdf', date:'2012-2-22', author:'rx', showComment: false,
                    img:'http://cosmouk.cdnds.net/14/36/768x1145/nrm_1409767636-dan_stevens_1.jpg' },
					{_id:2, text:'qwer', date:'2011-1-11', img:'',author:'rx',showComment:false,
                    img:'http://www.newyorker.com/wp-content/uploads/2014/10/Mead-Dan-Stevens-Brooklyn-320-240.jpg'}]
    it('should set the articles', ()=>{
        expect(Reducer(undefined, {type: Action.UPDATE_ARTICLE, articles: articleTest}))
        .to.eql({...initState, article:{...initState.article, articleID:1,articles: articleTest}})
    })

    it('should set the search keyword', () => {
        const keywordTest = 'new keyword'
        expect(Reducer(undefined, { type: Action.UPDATE_KEYWORD, keyword: keywordTest }))
            .to.eql({...initState, article:{...initState.article,keyword: keywordTest }})
    })

    it('should filter displayed articles by the search keyword', () => {
        expect(filterArticles(articleTest, 'asdf')).
            to.eql([{_id:1, text:'asdf', date:'2012-2-22', author:'rx', showComment:false,
                     img:'http://cosmouk.cdnds.net/14/36/768x1145/nrm_1409767636-dan_stevens_1.jpg' }])
    })
})