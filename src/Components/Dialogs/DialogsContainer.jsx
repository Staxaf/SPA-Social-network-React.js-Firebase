import React from 'react'
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {
    addMessage,
    changeMessage, confirmChangeMessage, confirmMessageChange,
    getDialogsData,
    updateDialogsData,
    updateMessageText
} from "../../redux/dialogs-reducer";
import { withRouter } from 'react-router-dom';


let mapStateToProps = (state) => {// данные со стэйта
    return {
        state: state.dialogsPage,
    }
}

const DialogsContainer = connect(mapStateToProps, {
    updateMessageText,
    addMessage,
    getDialogsData,
    updateDialogsData,
    changeMessage,
    confirmChangeMessage
})(withRouter(Dialogs))

export default DialogsContainer;
