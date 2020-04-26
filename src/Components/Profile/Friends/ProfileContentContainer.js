import React from 'react'
import {connect} from "react-redux";
import {getFollows, getUsers, setIsLoaded} from "../../../redux/state";
import FollowsAPIContainer from "./FollowsAPIContainer";


let mapStateToProps = (state, ownProps) => {

    return {
        user: ownProps.user,
        followsData: state.profilePage.followsData,
        usersData: state.profilePage.usersData,
        isLoaded: state.profilePage.isLoaded
    }
}


const ProfileContentContainer = connect(mapStateToProps, {getUsers, getFollows, setIsLoaded})(FollowsAPIContainer)

export default ProfileContentContainer;