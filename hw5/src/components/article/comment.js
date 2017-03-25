import React from 'react'
import { connect } from 'react-redux'

//the comment component
const Comment = ({author,date, text}) => {
    return(
        <div className="row">
            <h><bold>{author}</bold></h>
            <h>{date}</h>
            <p>{text}</p> 
        </div>
    )
}

export default connect()(Comment)