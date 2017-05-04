import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'
const webdriver = require('selenium-webdriver')

describe('Test Main Page article', () => {

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })
    it('should create a new article and validate the article appears in the feed',
    (done)=>{
        let newArticle = "asa"
        sleep(4000)
        .then(findId('newPost').clear())
        .then(findId('newPost').sendKeys(newArticle))
        .then(sleep(200))
        .then(findId('postBtn').click())
        .then(sleep(25000))
        .then(findId('editArticle').getText().then(text=>{
            expect(text).to.eql(newArticle)
        })
        .then(done))
    })

    it('should edit an article and validate the article text has updated', (done)=>{
        let postEdit
        let addPost = "blablabla"
        sleep(500)
        .then(findId('editArticle').getText()
        .then(text => {
            postEdit = text + addPost
            sleep(500)
            findId('editArticle').clear()
            sleep(500)
            findId('editArticle').sendKeys(postEdit)
            findId('editBtn').click()
            findId('editArticle').getText()
            .then(text =>{
                expect(text).to.eql(postEdit)
            })
        })
        .then(done))
    })

    it("should update the headline and verify the change", (done) => {
        let newHead = "fun"
        sleep(500)
        .then(findId('newHeadline').sendKeys(newHead))
        .then(findId('updateHeadBtn').click())
        .then(sleep(2000))
        .then(findId('headline').getText()
        .then(text =>{
            expect(text).to.eql(newHead)
        })
        .then(done))
    })

    it("should count the number of followed users", (done) =>{
        sleep(500)
        .then(findId('followers').findElements(webdriver.By.className('sidebar'))
        .then(follow=>{
            expect(follow.length).to.be.at.least(2)
        }))
        .then(done)
    })

    it("should add the user and verify the count increases by one", (done) =>{
        let foCount
        sleep(500)
        .then(findId('followers').findElements(webdriver.By.className('sidebar'))
        .then(follow=>{
            foCount = follow.length
            sleep(6000)
            .then(findId('newFollower').sendKeys('jz65'))
            .then(findId('addFollowerBtn').click())
            .then(sleep(8000))
            .then(findId('followers').findElements(webdriver.By.className('sidebar'))
                .then(follow=>{
                    expect(foCount + 1).to.eql(follow.length)
                }))
        })
        .then(done))
    })

    it("should remove the user and verify the count decreases by one", (done) =>{
        let foCount
        sleep(500)
        .then(findId('followers').findElements(webdriver.By.className('sidebar'))
        .then(follow=>{
            foCount = follow.length
            sleep(2000)
            .then(findId('unfollowBtn').click())
            .then(sleep(8000))
            .then(findId('followers').findElements(webdriver.By.className('sidebar'))
                .then(follow=>{
                    expect(foCount - 1).to.eql(follow.length)
                }))
        })
        .then(done))
    }) 

    it("should search and verify only one article shows, and verify the author", (done) =>{
        let keyword = 'Only One Article Like This'
        sleep(500)
        .then(findId('searchInput').clear())
        .then(findId('searchInput').sendKeys(keyword))
        .then(sleep(500))
        .then(findId('articleAuthor').getText()
            .then(author => {
                expect(author).eql('rx4test')
            }))
        .then(findId('articleSet')
            .findElements(webdriver.By.className('singleArticle')).then(
            (article)=>{
                expect(article.length).to.be.eql(1)
            }
        ))
        .then(sleep(500))
        .then(done)

    }) 
})