import React from 'react'
import {
    addCommentCreator,
    addPostActionCreator,
    updateNewCommentTextCreator,
    updateNewPostTextCreator
} from "../../../redux/state";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


/*const MyPostsContainer = (props) => {
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
        props.store.dispatch(updateNewCommentTextCreator(e.target.value, id))
    }

    return (
        <MyPosts onPostChange={onPostChange} addPost={addPost} postsData={props.store.getState().profilePage.postsData}
                 newPostText={props.store.getState().profilePage.newPostText}
                 addComment={addComment} onCommentChange={onCommentChange}/>
    )
}*/

let mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },
        onPostChange: (text) => {
            dispatch(updateNewPostTextCreator(text))
        },
        addComment: (id) => {
            dispatch(addCommentCreator(id))
        },
        onCommentChange: (text, id) => {
            dispatch(updateNewCommentTextCreator(text, id))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)

export default MyPostsContainer;