import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo name={props.store.getState().profilePage.name} folowers={props.store.getState().profilePage.folowers}/>
            <MyPostsContainer store={props.store}/> {/*dispatch={props.store.dispatch} postsData={props.store.getState().profilePage.postsData} */}
        </div>
    )
}

export default Profile;