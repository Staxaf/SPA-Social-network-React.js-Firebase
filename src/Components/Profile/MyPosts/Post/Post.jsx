import React from 'react'
import css from './Post.module.css'

const Post = (props) => {
    
    return (
        <div>
            {props.message}
            <div>
                {props.likeCounts} likes
            </div>
        </div>

    )
}

export default Post;