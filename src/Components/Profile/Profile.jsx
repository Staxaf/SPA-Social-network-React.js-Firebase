import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
//name={props.store.getState().profilePage.name} folowers={props.store.getState().profilePage.folowers}
   // props.setUser(props.user.name, props.user.photoURL)
    return (
        <div>
            <ProfileInfo photoURL={props.user.photoURL} name={props.user.name} folowers={props.store.getState().profilePage.folowers}/>
            <MyPostsContainer user={props.user} /> {/* store={props.store} dispatch={props.store.dispatch} postsData={props.store.getState().profilePage.postsData} */}
        </div>
    )
}

export default Profile;