import React, {useEffect, useState} from 'react'
import Profile from "./Profile";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Loader from "react-loader-spinner";
import {
    getUsersFollowsAndFollowers,
    setModalMessageWindow, uploadImageThunk
} from "../../redux/profile-reducer";
import {addFollowThunk, getUsers} from "../../redux/users-reducer";
import {createDialogAndRedirect, getDialogsData} from "../../redux/dialogs-reducer";


const ProfileContainer = props => {
    let userUid = props.match.params.userUid !== undefined && ['myPosts', 'friends', 'followers'].indexOf(props.match.params.userUid) === -1
        ? props.match.params.userUid  : props.user.uid
    useEffect(() => {
        props.getUsersFollowsAndFollowers(props.user, userUid)
        props.getUsers(props.user, 0)
    }, [props.match.params])

    return props.profilePage.isCurrentUserLoaded ?
        <Profile {...props} userUidFromUrl={userUid} />
        : <div className="text-center">
            <Loader type="Oval"
                    color="#00BFFF"
                    height={40}
                    width={40}/>
        </div>
}

let mapStateToProps = (state) => ({
    profilePage: state.profilePage,
    usersData: state.usersPage.usersData,
    currentUser: state.profilePage.currentUserProfile,
    dialogsData: state.dialogsPage.dialogsData,
    user: state.profilePage.user
})


export default connect(mapStateToProps, {
    getUsersFollowsAndFollowers,
    addFollowThunk,
    getUsers,
    createDialogAndRedirect,
    getDialogsData,
    uploadImageThunk
})(withRouter(ProfileContainer));