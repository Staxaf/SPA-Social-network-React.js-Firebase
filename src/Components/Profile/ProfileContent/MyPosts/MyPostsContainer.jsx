import React from 'react'
import {connect} from "react-redux";
import MyPostsAPIContainer from "./MyPostsAPIContainer";
import {withRouter} from "react-router-dom";
import {
    addCommentThunk,
    addPostThunk, getUserPosts, getUsersFollowsAndFollowers,
    toggleDislikeThunk, toggleLikeThunk
} from "../../../../redux/profile-reducer";


let mapStateToProps = (state, ownProps) => {

    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
        isFetching: state.profilePage.isFetching,
        currentUser: ownProps.currentUser,
        user: ownProps.user,
        uidFromUrl: ownProps.uidFromUrl
    }
}

const MyPostsContainer = connect(mapStateToProps, {
    getUserPosts,
    getUsersFollowsAndFollowers,
    toggleLikeThunk,
    toggleDislikeThunk,
    addPostThunk,
    addCommentThunk
})(withRouter(MyPostsAPIContainer))

export default MyPostsContainer;