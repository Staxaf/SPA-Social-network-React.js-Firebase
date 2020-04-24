import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Profile from "./Profile";
import firebase from "./../../firebase";
import {setUser} from "../../redux/state";

class ProfileContainer extends React.Component{

    componentDidMount() {
        const db = firebase.firestore()
        db.collection('postsData').get()
            .then( response => {
                this.posts = response.docs.map(doc => {
                    return {
                        ...doc.data(),
                        uid: doc.id
                    }
                })
            })

    }

    render = () => {
        return (
            <Profile {...this.props} setUser={setUser} />
        )
    }
}

export default ProfileContainer;