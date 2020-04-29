import React from 'react'
import {connect} from "react-redux";
import ProfileContentAPIContainer from "./ProfileContentAPIContainer";
import {getFollows, getUsersFollowsAndFollowers, setIsLoaded} from "../../../redux/profile-reducer";
import {addFollowThunk} from "../../../redux/users-reducer";
import {withRouter} from "react-router-dom";


let mapStateToProps = (state, ownProps) => {

    return {
        user: ownProps.user,
        followsOfCurrentUser: ownProps.followsOfCurrentUser,
        followersOfCurrentUser: ownProps.followersOfCurrentUser,
        followsData: state.profilePage.followsData,
        usersData: state.profilePage.usersData,
        isLoaded: state.profilePage.isLoaded,
        currentUser: ownProps.currentUser,
        uidFromUrl: ownProps.uidFromUrl
    }
}


const ProfileContentContainer = connect(mapStateToProps, {
    getFollows,
    setIsLoaded
})(withRouter(ProfileContentAPIContainer))

export default ProfileContentContainer;