import React from 'react'
import {connect} from "react-redux";
import {addFollow, setUsers, toggleIsFetching} from "../../redux/state";
import UsersAPIComponent from "./UsersAPIComponent";

let mapStateToProps = (state, ownProps) => {

    return {
        state: state.usersPage,
        isFetching: state.usersPage.isFetching,
        user: ownProps.user
    }
}

let UsersContainer = connect(mapStateToProps,{
    addFollow,
    setUsers,
    toggleIsFetching
})(UsersAPIComponent)

export default UsersContainer