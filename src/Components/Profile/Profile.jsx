import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfileContentContainer from "./Friends/ProfileContentContainer";


const Profile = (props) => {

    return (
        <div>
            <ProfileInfo user={props.user} />
            <ProfileContentContainer currentUser={props.currentUser} followsOFCurrentUser={props.followsOfCurrentUser} followersOfCurrentUser={props.followersOfCurrentUser} user={props.user} />
        </div>
    )
}

export default Profile;