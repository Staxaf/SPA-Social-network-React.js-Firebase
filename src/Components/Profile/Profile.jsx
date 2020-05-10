import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfileContentContainer from "./ProfileContent/ProfileContentContainer";
import {getDialogsData} from "../../redux/dialogs-reducer";


const Profile = (props) => {

    return (

        <div>
            <ProfileInfo dialogsData={props.dialogsData} isModalMessageOpen={props.profilePage.isModalMessageOpen}
                         uidFromUrl={props.uidFromUrl}
                         getUsersFollowsAndFollowers={props.getUsersFollowsAndFollowers} getUsers={props.getUsers}
                         addFollow={props.addFollowThunk} users={props.users} user={props.user}
                         currentUser={props.currentUser} setModalMessageWindow={props.setModalMessageWindow}
                         createDialogAndRedirect={props.createDialogAndRedirect} getDialogsData={props.getDialogsData} followsCount={props.followsOfCurrentUser.length}
                            followersCount={props.followersOfCurrentUser.length}/>
            <ProfileContentContainer uidFromUrl={props.uidFromUrl} currentUser={props.currentUser}
                                      user={props.user}/>
        </div>
    )
}

export default Profile;