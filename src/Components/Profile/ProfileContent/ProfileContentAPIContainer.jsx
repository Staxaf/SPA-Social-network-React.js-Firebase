import React from 'react'
import firebase from "../../../firebase";
import {Route} from "react-router-dom";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Followers from "./Followers/Followers";
import Friends from "./Friends/Friends";

class ProfileContentAPIContainer extends React.Component {

    componentDidMount = () => {
        const db = firebase.firestore()
        console.log('followers: ', this.props.followersOfCurrentUser, 'follows: ', this.props.followsOfCurrentUser)
        //if(this.props.followsOfCurrentUser !== undefined) this.props.setIsLoaded(true)
        /*db.collection('users')
            .get()
            .then(data => {
                this.users = data.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id,
                }))
                this.currentUserPlace = 0
                this.users.forEach((item, i) => {
                    if (item.uid === this.props.user.uid) {
                        this.currentUserPlace = i
                        this.currentUser = item
                    }
                })
                this.users.splice(this.currentUserPlace, 1)// удаляю из списка текущего пользователя
                this.users = this.users.map((item, id) => ({
                    ...item,
                    id
                }))
                this.friends = []
                this.followers = []
                db.collection('users').doc(this.props.user.uid).get().then(data => {
                    this.followsOfCurrentUser = data.data().follows// получаю текущие подписки пользователя
                    this.followersOfCurrentUser = data.data().followers// получаю текущих подписчиков пользователя
                    this.users.forEach(item => {
                        if (this.followsOfCurrentUser.indexOf(item.uid) !== -1) this.friends = [...this.friends, item]
                    })
                    this.users.forEach(item => {
                        if(this.followersOfCurrentUser.indexOf(item.uid) !== -1) this.followers = [...this.followers, item]
                    })
                    this.props.getUsers(this.props.user.uid, this.users, this.friends)
                })
            })*/
    }

    componentWillUnmount() {
        this.props.setIsLoaded(false)
    }

    render = () => {
        return <>
            <Route path='/profile/:userId?/myPosts'
                   render={() => <MyPostsContainer
                                                   currentUser={this.props.currentUser} user={this.props.user}/>}/>
            <Route path='/profile/:userId?/friends'
                   render={() => <Friends follows={this.props.followsData} isLoaded={this.props.isLoaded}
                                          user={this.props.user}/>}/>
            <Route path='/profile/:userId?/followers'
                   render={() => <Followers isLoaded={this.props.isLoaded} followers={this.props.followersOfCurrentUser}
                                            user={this.props.user}/>}/>
        </>
    }
}

export default ProfileContentAPIContainer
