import React, {useEffect} from 'react'
import Users from "./Users";

const UsersAPIComponent = props => {

    useEffect(() => {
        props.getUsers(props.user, 0)
    }, [])

    return <Users users={props.state.usersData} currentUser={props.user}
                  addFollowThunk={props.addFollowThunk} isFetching={props.isFetching}/>

}

export default UsersAPIComponent;