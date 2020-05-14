import React, {useEffect} from 'react'
import User from "./User/User";
import css from './Users.module.css'
import Loader from 'react-loader-spinner'
import firebase from "./../../firebase";


let Users = (props) => {
    let userId = props.lastUserId
    let newUsers = []


    return (
        <>
            {props.isFetching ? <div className="text-center">
                <Loader type="Oval"
                        color="#00BFFF"
                        height={40}
                        width={40}/>
            </div> : <div>
                {props.users.map((user, index) => {
                    if (user.isDisplay) {
                        userId = user.id
                        return <User users={props.users} currentUserId={props.currentUserId}
                                     currentUser={props.currentUser} uid={props.currentUser.uid}
                                     userUid={user.uid} id={index} photoUrl={user.photoURL} fullName={user.name}
                                     addFollow={props.addFollowThunk} isFollow={user.isFollow} state={user.state} isOnline={user.online}/>
                    }
                })}
                <div className={`${css.users__btn} ${props.users.length === userId ? css.display_none : ''}`}>
                    <button onClick={() => {
                        props.setUsers(userId, props.state.usersData)
                    }}>Show more
                    </button>
                </div>
            </div>}

        </>
    )
}

export default Users;



