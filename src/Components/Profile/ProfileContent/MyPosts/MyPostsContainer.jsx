import React from 'react'
import {connect} from "react-redux";
import MyPostsAPIContainer from "./MyPostsAPIContainer";
import {withRouter} from "react-router-dom";
import {
    addCommentThunk,
    addPostThunk, getUserPosts, getUsersFollowsAndFollowers, setUploadedPostPhoto,
    toggleDislikeThunk, toggleLikeThunk, uploadPostPhoto
} from "../../../../redux/profile-reducer";


let mapStateToProps = (state, ownProps) => {

    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
        isFetching: state.profilePage.isFetching,
        uploadedPostPhoto: state.profilePage.uploadedPostPhoto,
        currentUser: ownProps.currentUser,
        user: ownProps.user,
        uidFromUrl: ownProps.uidFromUrl,
        isPostPhotoUploading: state.profilePage.isPostPhotoUploading
    }
}

const MyPostsContainer = connect(mapStateToProps, {
    getUserPosts,
    getUsersFollowsAndFollowers,
    toggleLikeThunk,
    toggleDislikeThunk,
    addPostThunk,
    addCommentThunk,
    uploadPostPhoto,
    setUploadedPostPhoto
})(withRouter(MyPostsAPIContainer))

export default MyPostsContainer;