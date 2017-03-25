import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

import Reducer, {common, article, commonState, profileState, followState, articleState} from './reducers'
import {filterArticles} from './components/article/searchArticle'
import Action from './actions'
//import {filterArticles} from './components/article/searchArticle'

describe('Validate Reducer', () =>{
    it('should initialize state', ()=>{
        expect(Reducer(undefined,{})).to.eql({
            common: commonState,
            article: articleState,
            follow: followState,
            profile: profileState
        })
    })

    it('should state success', ()=>{
        const sucMsg = 'new success'
        expect(common(undefined, {type: Action.SUCCESS, sucMsg}))
        .to.eql({location:'LANDING', sucMsg:'new success',errMsg:''})
    })
    
    it('should state error', ()=>{
        const errMsg = 'new error'
        expect(common(undefined, {type: Action.ERR, errMsg}))
        .to.eql({location:'LANDING', errMsg:'new error', sucMsg:''})
    })

    let articleTest = {1:{_id:0, text:'asdf', date:'2012-2-22', author:'rx',
                    img:'http://cosmouk.cdnds.net/14/36/768x1145/nrm_1409767636-dan_stevens_1.jpg' },
					2:{_id:1, text:'qwer', date:'2011-1-11', img:'',author:'rx',
                    img:'http://www.newyorker.com/wp-content/uploads/2014/10/Mead-Dan-Stevens-Brooklyn-320-240.jpg'}}
    it('should set the articles', ()=>{
        expect(article(undefined, {type: Action.UPDATE_ARTICLE, articles: articleTest}))
        .to.eql({articles: articleTest,keyword:''})
    })

    it('should set the search keyword', () => {
        const keywordTest = 'new keyword'
        expect(article(undefined, { type: Action.UPDATE_KEYWORD, keyword: keywordTest }))
            .to.eql({ keyword: keywordTest, articles:{} })
    })

    it('should filter displayed articles by the search keyword', () => {
        expect(filterArticles(articleTest, 'asdf')).
            to.eql([{_id:0, text:'asdf', date:'2012-2-22', author:'rx',
                     img:'http://cosmouk.cdnds.net/14/36/768x1145/nrm_1409767636-dan_stevens_1.jpg' }])
    })
})