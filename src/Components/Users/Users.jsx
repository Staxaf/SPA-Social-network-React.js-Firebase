import React from 'react'
import User from "./User/User";
import css from './Users.module.css'


const Users = (props) => {
    let lastUserId = 0;
    let users = props.state.usersData.map(user => {
        if (user.isDisplay) {
            lastUserId = user.id
            return <User id={user.id} photoUrl={user.photoUrl} fullName={user.fullName} location={user.location}
                         isFollow={user.isFollow} addFollow={props.addFollow}/>
        }
    })

    return (
        <div>
            {users}
            <div className={`${css.users__btn} ${users.length === lastUserId ? css.display_none : ''}`}>
                <button onClick={() => {
                    props.setUsers(lastUserId)
                }}>Show more
                </button>
            </div>
        </div>
    )
}

export default Users;

/*class Users extends React.Component {
    constructor(props) {
        super(props);
        this.lastUserId = 0
        this.users = props.state.usersData.map( user => {
            if(user.isDisplay){
                this.lastUserId = user.id
                return <User id={user.id} photoUrl={user.photoUrl} fullName={user.fullName} location={user.location}
                             isFollow={user.isFollow} addFollow={props.addFollow}/>
            }
        })
    }
    render(){
        return (
            <div>
                {this.users}
                <div className={`${css.users__btn} ${this.users.length === this.lastUserId ? css.display_none : ''}`}>
                    <button onClick={() => {this.props.setUsers(this.lastUserId)}}>Show more</button>
                </div>
            </div>
        )
    }
}*/

