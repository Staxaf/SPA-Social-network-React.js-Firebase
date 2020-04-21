import React from 'react'
import {
    addComment,
    addPost, setPosts,
    onCommentChange,
    onPostChange, setIsFetching
} from "../../../redux/state";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
        isFetching: state.profilePage.isFetching
    }
}


const MyPostsContainer = connect(mapStateToProps,{addPost, onPostChange, addComment, onCommentChange, setPosts, setIsFetching})(MyPosts)

export default MyPostsContainer;