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
                        this.currentUserPlace = i
                        this.currentUser = item
                    }
                })
                this.users.splice(this.currentUserPlace, 1)// удаляю из списка текущего пользователя
                this.users = this.users.map((item, id) => ({
                    ...item,
                    id
                }))
                this.users = this.users.map(item => this.props.user.follows.indexOf(item.uid) !== -1 ? {
                    ...item,
                    isFollow: true
                } : {...item, isFollow: false})
                this.props.toggleIsFetching(false)
                this.props.setUsers(this.lastUserId, this.users)// получаю всех пользователей из базы и передаю в функцию
            })
    }

    render() {
        return <Users currentUserId={this.currentUserPlace} currentUser={this.currentUser} uid={this.props.user.uid}
                      state={{...this.props.state, usersData: this.users}} addFollow={this.props.addFollow}
                      setUsers={this.props.setUsers} lastUserId={this.lastUserId}
                      isFetching={this.props.isFetching}/>
    }
}

/*const UsersAPIComponent = (props) => {
    let lastUserId = 0
        props.toggleIsFetching(true)
        //const [users, setUsers] = React.useState([])

        const db = firebase.firestore()
        db.collection('usersData')
            .get()
            .then( querySnapshot => {
                let users = querySnapshot.docs.map(doc => doc.data())
                console.log(users)
            } )
        props.toggleIsFetching(false)
        //props.setUsers(lastUserId, users)
        //console.log(users)
    return (
        <Users state={props.state} addFollow={props.addFollow} setUsers={props.setUsers} lastUserId={lastUserId}
                isFetching={props.isFetching}/>
    )
}*/

export default UsersAPIComponent;