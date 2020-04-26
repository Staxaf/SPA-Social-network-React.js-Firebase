import React from 'react'
import * as axios from "axios";
import User from "./User/User";
import css from "./Users.module.css";
import Users from "./Users";
import firebase from "../../firebase";

class UsersAPIComponent extends React.Component {
    constructor(props) {
        super(props);
        this.lastUserId = 0
        this.users = []
    }

    componentDidMount() {
        this.props.toggleIsFetching(true)

        const db = firebase.firestore()
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
                        this.followsOfCurrentUser = item.follows// сохраняю follows текущего залогиневшегося пользователя для того, чтобы всегда были достоверные данные
                        this.currentUserPlace = i
                        this.currentUser = item
                    }
                })
                this.users.splice(this.currentUserPlace, 1)// удаляю из списка текущего пользователя
                this.users = this.users.map((item, id) => ({
                    ...item
                }))
                this.users = this.users.map(item => this.followsOfCurrentUser.indexOf(item.uid) !== -1 ? {
                    ...item,
                    isFollow: true
                } : {...item, isFollow: false})
                this.props.toggleIsFetching(false)
                this.props.setUsers(this.lastUserId, this.users, this.currentUserPlace)// получаю всех пользователей из базы и передаю в функцию
            })
    }

    render() {
        return <Users currentUserId={this.currentUserPlace} currentUser={this.currentUser} uid={this.props.user.uid}
                      state={{...this.props.state, usersData: this.users}} addFollow={this.props.addFollow}
                      setUsers={this.props.setUsers} lastUserId={this.lastUserId}
                      isFetching={this.props.isFetching}/>
    }
}

export default UsersAPIComponent;