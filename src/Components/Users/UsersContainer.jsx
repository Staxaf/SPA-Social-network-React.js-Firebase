import React from 'react'
import {connect} from "react-redux";
import UsersAPIComponent from "./UsersAPIComponent";
import {addFollow, addFollowThunk, getUsers, setUsers, toggleIsFetching} from "../../redux/users-reducer";

let mapStateToProps = (state, ownProps) => {

    return {
        state: state.usersPage,
        isFetching: state.usersPage.isFetching,
        user: ownProps.user
    }
}

let UsersContainer = connect(mapStateToProps,{

    getUsers, addFollowThunk
})(UsersAPIComponent)

export default UsersContainer