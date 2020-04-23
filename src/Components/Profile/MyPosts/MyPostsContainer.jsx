import React from 'react'
import {
    addComment,
    addPost, setPosts,
    onCommentChange,
    onPostChange, setIsFetching, addLike, addDislike, setUser
} from "../../../redux/state";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import store from "../../../redux/redux-store";


let mapStateToProps = (state, ownProps) => {

    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
        isFetching: state.profilePage.isFetching,
        photoURL: ownProps.user.photoURL,
        name: ownProps.user.name,
        uid: ownProps.user.uid
    }
}


const MyPostsContainer = connect(mapStateToProps, {
    addPost,
    onPostChange,
    addComment,
    onCommentChange,
    setPosts,
    setIsFetching,
    addLike,
    addDislike,
    setUser
})(MyPosts)

export default MyPostsContainer;