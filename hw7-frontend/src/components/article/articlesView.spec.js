import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { ArticlesView } from './articlesView'
import { NewArticle } from './newArticle'

describe('ArticlesView', () => {

    it('should render articles', () => {
        let articles = [
            { _id: 1, text: 'asdg', author: 'user1', date: '2017-3-22', comments: [], img: '' },
        ]
        const node = shallow(
            <div>
                <ArticlesView articleSet={articles} />
            </div>)
        expect(node.children().length).to.eql(1)
    })

    // // it('should dispatch actions to create a new article', () => {
    // //     let toggled = false
    // //     // const componentTree = TestUtils.renderIntoDocument(<div><NewArticle /></div>)
    // //     // const input = TestUtils.findRenderedDOMComponentWithClass(componentTree, 'text-submit')
        
    // //     // TestUtils.Simulate.click(input)
    // //     // const component = TestUtils.renderIntoDocument(<div><NewArticle addArticle={_=>toggled=true}/></div>)
    // //     // const input = findDOMNode(component).children[0].children[0]
    // //     // input.value = 'text'
    // //     // const input2 = findDOMNode(component).children[0].children[findDOMNode(component).children[0].children.length - 1]
    // //     // TestUtils.Simulate.click(input2)
    // //     expect(toggled).to.be.true
    // })
})