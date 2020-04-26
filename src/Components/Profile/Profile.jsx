import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfileContentContainer from "./Friends/ProfileContentContainer";


const Profile = (props) => {

    return (
        <div>
            <ProfileInfo user={props.user} />
            <ProfileContentContainer user={props.user} />
        </div>
    )
}

export default Profile;