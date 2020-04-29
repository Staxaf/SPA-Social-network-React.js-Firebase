import React, {useDebugValue} from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfileContentContainer from "./ProfileContent/ProfileContentContainer";


const Profile = (props) => {

    return (

        <div>
            <ProfileInfo addFollow={props.addFollowThunk} users={props.users} user={props.user} currentUser={props.currentUser}/>
            <ProfileContentContainer uidFromUrl={props.uidFromUrl} currentUser={props.currentUser} followsOFCurrentUser={props.followsOfCurrentUser}
                                     followersOfCurrentUser={props.followersOfCurrentUser} user={props.user}/>
        </div>
    )
}

export default Profile;