import React from 'react'
import {connect} from "react-redux";
import MyPostsAPIContainer from "./MyPostsAPIContainer";
import {withRouter} from "react-router-dom";
import {
    addCommentThunk,
    addPostThunk, getUserPosts, getUsersFollowsAndFollowers,
    onCommentChange,
    onPostChange,
    setIsFetching,
    setPosts, toggleDislikeThunk, toggleLikeThunk
} from "../../../../redux/profile-reducer";
import {setUser} from "../../../../redux/auth-reducer";


let mapStateToProps = (state, ownProps) => {

    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
        isFetching: state.profilePage.isFetching,
        photoURL: ownProps.user.photoURL,
        currentUser: ownProps.currentUser,
        user: ownProps.user,
        name: ownProps.user.name,
        uid: ownProps.user.uid,
        uidFromUrl: ownProps.uidFromUrl
    }
}

const MyPostsContainer = connect(mapStateToProps, {
    onPostChange,
    onCommentChange,
    setPosts,
    setIsFetching,
    setUser,
    getUserPosts,
    getUsersFollowsAndFollowers,
    toggleLikeThunk,
    toggleDislikeThunk,
    addPostThunk,
    addCommentThunk
})(withRouter(MyPostsAPIContainer))

export default MyPostsContainer;