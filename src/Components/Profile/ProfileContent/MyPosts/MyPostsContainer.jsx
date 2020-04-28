import React from 'react'
import {connect} from "react-redux";
import MyPostsAPIContainer from "./MyPostsAPIContainer";
import {withRouter} from "react-router-dom";
import {
    addComment, addDislike, addLike,
    addPost,
    onCommentChange,
    onPostChange,
    setIsFetching,
    setPosts
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
        uid: ownProps.user.uid
    }
}

const MyPostsContainer = connect(mapStateToProps,{
    addPost,
    onPostChange,
    addComment,
    onCommentChange,
    setPosts,
    setIsFetching,
    addLike,
    addDislike,
    setUser
})(withRouter(MyPostsAPIContainer))

export default MyPostsContainer;