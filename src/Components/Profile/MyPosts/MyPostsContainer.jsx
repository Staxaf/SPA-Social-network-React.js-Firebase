import React from 'react'
import {
    addCommentCreator,
    addPostActionCreator,
    updateNewCommentText,
    updateNewPostTextCreator
} from "../../../redux/state";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
    let addPost = () => {
        //{type: 'ADD-POST'}
        props.store.dispatch(addPostActionCreator())
    }

    let onPostChange = (e) => {
        props.store.dispatch(updateNewPostTextCreator(e.target.value))
    }

    let addComment = (id) => {
        props.store.dispatch(addCommentCreator(id))
    }
    let onCommentChange = (e, id) => {
        props.store.dispatch(updateNewCommentText(e.target.value, id))
    }

    return (
        <MyPosts onPostChange={onPostChange} addPost={addPost} postsData={props.store.getState().profilePage.postsData}
                 newPostText={props.store.getState().profilePage.newPostText}
                 addComment={addComment} onCommentChange={onCommentChange}/>
    )
}

export default MyPostsContainer;