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
                    uid: doc.id
                }))
                this.props.toggleIsFetching(false)
                this.props.setUsers(this.lastUserId, this.users)// получаю всех пользователей из базы и передаю в функцию
            })
    }

    render() {
        return <Users state={{...this.props.state, usersData: this.users}} addFollow={this.props.addFollow}
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