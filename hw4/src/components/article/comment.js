import React from 'react'
import { connect } from 'react-redux'

const Comment = ({comment}) => {
    return(
        <div>
            <b>Comments: </b> {comment}
        </div>
    )
}

export default connect() (Comment)
