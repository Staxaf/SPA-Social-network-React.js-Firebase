import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Profile from "./Profile";
import firebase from "./../../firebase";
import {setUser} from "../../redux/state";

class ProfileContainer extends React.Component{

    render = () => {
        return (
            <Profile {...this.props} setUser={setUser} />
        )
    }
}

export default ProfileContainer;