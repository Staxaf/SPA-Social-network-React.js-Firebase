import React from 'react'
import {connect} from "react-redux";
import ProfileContentAPIContainer from "./ProfileContentAPIContainer";
import {getFollows, getUsers, setIsLoaded} from "../../../redux/profile-reducer";


let mapStateToProps = (state, ownProps) => {

    return {
        user: ownProps.user,
        followsOfCurrentUser: ownProps.followsOfCurrentUser,
        followersOfCurrentUser: ownProps.followersOfCurrentUser,
        followsData: state.profilePage.followsData,
        usersData: state.profilePage.usersData,
        isLoaded: state.profilePage.isLoaded,
        currentUser: ownProps.currentUser
    }
}


const ProfileContentContainer = connect(mapStateToProps, {
    getUsers,
    getFollows,
    setIsLoaded
})(ProfileContentAPIContainer)

export default ProfileContentContainer;