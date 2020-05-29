import React from 'react'
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {
    addMessageThunk,
    changeMessage, confirmChangeMessage, deleteMessageThunk,
    getDialogsData, resetUnreadMessages, setUploadedMessagePhoto,
    updateDialogsData, uploadMessagePhoto,
} from "../../redux/dialogs-reducer";
import { withRouter } from 'react-router-dom';
import {getUsers} from "../../redux/users-reducer";


let mapStateToProps = (state) => {// данные со стэйта
    return {
        state: state.dialogsPage,
        usersData: state.usersPage.usersData,
        user: state.profilePage.user,
    }
}

const DialogsContainer = connect(mapStateToProps, {
    addMessageThunk,
    getDialogsData,
    updateDialogsData,
    changeMessage,
    confirmChangeMessage,
    getUsers,
    deleteMessageThunk,
    resetUnreadMessages,
    uploadMessagePhoto,
    setUploadedMessagePhoto
})(withRouter(Dialogs))

export default DialogsContainer;
