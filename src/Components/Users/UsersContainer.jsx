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

/*let mapDispatchToProps = (dispatch) => {
    return {
        addFollow: (id) => {
            dispatch(addFollowCreator(id))
        },
        setUsers: (id, usersData) => {
            dispatch(setUsersCreator(id, usersData))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetching(isFetching))
    }
    }
}*/
let UsersContainer = connect(mapStateToProps,{
    addFollow,
    setUsers,
    toggleIsFetching
})(UsersAPIComponent)

export default UsersContainer