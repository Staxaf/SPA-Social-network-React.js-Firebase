import React from 'react'
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {
    addMessage, addMessageThunk,
    changeMessage, confirmChangeMessage, deleteMessageThunk,
    getDialogsData, resetUnreadMessages,
    updateDialogsData,
    updateMessageText
} from "../../redux/dialogs-reducer";
import { withRouter } from 'react-router-dom';
import {getUsers} from "../../redux/users-reducer";


let mapStateToProps = (state) => {// данные со стэйта
    return {
        state: state.dialogsPage,
        usersData: state.usersPage.usersData,
        user: state.profilePage.user
    }
}

const DialogsContainer = connect(mapStateToProps, {
    updateMessageText,
    addMessageThunk,
    getDialogsData,
    updateDialogsData,
    changeMessage,
    confirmChangeMessage,
    getUsers,
    deleteMessageThunk,
    resetUnreadMessages
})(withRouter(Dialogs))

export default DialogsContainer;
