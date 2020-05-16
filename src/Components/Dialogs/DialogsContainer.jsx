import React from 'react'
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {
    addMessage,
    changeMessage, confirmChangeMessage, deleteMessageThunk,
    getDialogsData,
    updateDialogsData,
    updateMessageText
} from "../../redux/dialogs-reducer";
import { withRouter } from 'react-router-dom';
import {getUsers} from "../../redux/users-reducer";


let mapStateToProps = (state) => {// данные со стэйта
    return {
        state: state.dialogsPage,
        usersData: state.usersPage.usersData
    }
}

const DialogsContainer = connect(mapStateToProps, {
    updateMessageText,
    addMessage,
    getDialogsData,
    updateDialogsData,
    changeMessage,
    confirmChangeMessage,
    getUsers,
    deleteMessageThunk
})(withRouter(Dialogs))

export default DialogsContainer;
