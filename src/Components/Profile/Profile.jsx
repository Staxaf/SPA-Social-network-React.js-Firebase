import React from 'react'
import css from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Post from "./MyPosts/Post/Post";

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo name={props.state.name} folowers={props.state.folowers}/>
            <MyPosts postsData={props.state.postsData} addPost={props.addPost} newPostText={props.state.newPostText}
                     updateNewPostText={props.updateNewPostText} addComment={props.addComment} updateCommentText={props.updateCommentText}/>
        </div>
    )
}

export default Profile;