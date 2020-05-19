import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfileContentContainer from "./ProfileContent/ProfileContentContainer";

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo dialogsData={props.dialogsData} currentUser={props.user} user={props.currentUser}
                         uidFromUrl={props.userUidFromUrl} followsCount={props.profilePage.followsData.length}
                         followersCount={props.profilePage.followersData.length} users={props.usersData}
                         getUsersFollowsAndFollowers={props.getUsersFollowsAndFollowers} getUsers={props.getUsers}
                         addFollow={props.addFollowThunk} createDialogAndRedirect={props.createDialogAndRedirect}
                         getDialogsData={props.getDialogsData} />
            <ProfileContentContainer uidFromUrl={props.userUidFromUrl} currentUser={props.user}
                                      user={props.currentUser}/>
        </div>
    )
}

export default Profile;