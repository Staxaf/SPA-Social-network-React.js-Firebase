import React from 'react'
import css from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = () => {
    return (
        <div>
            My post
            <Post message='Hi, how are you?)' likeCounts='16'/>
            <Post message='This is my first post' likeCounts='20' />
        </div>
    )
}

export default MyPosts;