import React, {useEffect} from 'react'
import User from "./User/User";
import css from './Users.module.css'
import Loader from 'react-loader-spinner'


const Users = (props) => {

    return (
        <>
            {props.isFetching ? <div className="text-center">
                <Loader type="Oval"
                        color="#00BFFF"
                        height={40}
                        width={40}/>
            </div> : <div>
                {props.users.map((user, index) => {
                        return <User users={props.users} currentUserId={props.currentUserId}
                                     currentUser={props.currentUser} uid={props.currentUser.uid}
                                     userUid={user.uid} id={index} photoUrl={user.photoURL} fullName={user.name}
                                     addFollow={props.addFollowThunk} isFollow={user.isFollow} state={user.state} isOnline={user.online}/>

                })}
            </div>}

        </>
    )
}

export default Users;



