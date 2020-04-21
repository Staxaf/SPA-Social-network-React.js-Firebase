import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Profile from "./Profile";
import firebase from "./../../firebase";

class ProfileContainer extends React.Component{

   /* componentDidMount() {
        const db = firebase.firestore()
        db.collection('postsData').get()
            .then( response => {
                this.posts = response.docs.map(doc => {
                    console.log(doc.id)
                    return {
                        ...doc.data(),
                        uid: doc.id
                    }
                })
                console.log(this.posts)
            })
    }*/

    render = () => {
        return (
            <Profile {...this.props} />
        )
    }
}

export default ProfileContainer;