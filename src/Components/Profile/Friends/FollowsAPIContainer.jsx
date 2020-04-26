import React from 'react'
import firebase from "./../../../firebase";
import Friend from "./Friend";
import {Route} from "react-router-dom";
import MyPostsContainer from "../MyPosts/MyPostsContainer";
import Followers from "./Followers";
import Friends from "./Friends";

class FollowsAPIContainer extends React.Component {

    componentDidMount = () => {
        const db = firebase.firestore()

        this.friends = this.props.followsData.map(item => <Friend name={item.name}/>)
        console.log('users: ', this.props.usersData, 'follows: ', this.props.followsData)
        db.collection('users')
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
            })
    }

    componentWillUnmount() {
        this.props.setIsLoaded(true)
    }

    render = () => {
        console.log('followers: ', this.followers, 'friends: ', this.friends)
        return <>
            <Route path='/profile/myPosts' render={() => <MyPostsContainer user={this.props.user}/>}/>
            <Route path='/profile/friends' render={() => <Friends follows={this.friends} isLoaded={this.props.isLoaded}
                                                                  setIsLoaded={this.props.setIsLoaded}
                                                                  user={this.props.user}/>} />
            <Route path='/profile/followers' render={() => <Followers isLoaded={this.props.isLoaded} followers={this.followers} user={this.props.user}/>}/>
        </>
    }
}

export default FollowsAPIContainer
