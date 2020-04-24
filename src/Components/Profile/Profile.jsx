import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {Route} from "react-router-dom";
import Friends from "./Friends/Friends";

const Profile = (props) => {
//name={props.store.getState().profilePage.name} folowers={props.store.getState().profilePage.folowers}
   // props.setUser(props.user.name, props.user.photoURL)
    return (
        <div>
            <ProfileInfo user={props.user} />{/*photoURL={props.user.photoURL} name={props.user.name} followers={props.user.followers}*/}
            <Route path='/profile/myPosts' render={() => <MyPostsContainer user={props.user} />} />
            <Route path='/profile/friends' render={() => <Friends/>}/>
        </div>
    )
}

export default Profile;