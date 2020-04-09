import React from 'react'
import css from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo folowers='120' />
            <MyPosts />
        </div>
    )
}

export default Profile;