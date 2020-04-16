import React from 'react'
import User from "./User/User";


const Users = (props) => {

    let users = props.state.usersData.map( user => (
        <User id={user.id} photoUrl={user.photoUrl} fullName={user.fullName} location={user.location} isFollow={user.isFollow} addFollow={props.addFollow}/>
))

    return (
       <div>
           {users}
       </div>
    )
}

export default Users;