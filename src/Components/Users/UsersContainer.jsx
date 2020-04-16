import React from 'react'
import Users from "./Users";
import {connect} from "react-redux";
import {addFollowCreator, setUsers} from "../../redux/state";

let mapStateToProps = (state) => {

    return {
        state: state.usersPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addFollow: (id) => {
            dispatch(addFollowCreator(id))
        },
        setUsers: () => {
            dispatch(setUsers())
        }
    }
}


let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer