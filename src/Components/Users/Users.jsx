import React, {useEffect, useState} from 'react'
import User from "./User/User";
import css from './Users.module.css'
import Loader from 'react-loader-spinner'


const Users = (props) => {
    const [users, setUsers] = useState([])
    const [usersIndex, setUsersIndex] = useState(5)  // count of users, which can be display
    const [isAllUsersShown, setIsAllUsersShown] = useState(false)
    const setUsersJsx = () => {
        setUsers(props.users.map((user, key) => {
            if(props.users.length === 0) setIsAllUsersShown(true)
            if(key < usersIndex) {
                if(props.users.length === key + 1) setIsAllUsersShown(true)
                return <User key={key} users={props.users} currentUserId={props.currentUserId}
                             currentUser={props.currentUser} uid={props.currentUser.uid}
                             userUid={user.uid} id={key} photoUrl={user.photoURL} fullName={user.name}
                             addFollow={props.addFollowThunk} isFollow={user.isFollow}/>
            }

        }))
    }
    useEffect(() => {
        setUsersJsx()
    }, [props.users])

    useEffect(() => {
        setUsersJsx()
    }, [usersIndex])
    return (
        <>
            {props.isFetching ? <div className="text-center">
                <Loader type="Oval"
                        color="#00BFFF"
                        height={40}
                        width={40}/>
            </div> : <div>
                {users}
            </div>}
            {!isAllUsersShown &&  <div className={'showMore-buttonWrapper'}>
                <button onClick={() => setUsersIndex(usersIndex + 5)} className={'showMore-button'}>Show more</button>
            </div>}
        </>
    )
}

export default Users;



