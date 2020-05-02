import React from 'react'
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessage, getDialogsData, updateDialogsData, updateMessageText} from "../../redux/dialogs-reducer";


let mapStateToProps = (state, ownProps) => {// данные со стэйта
    return {
        state: state.dialogsPage,
    }
}

const DialogsContainer = connect(mapStateToProps, {
    updateMessageText,
    addMessage,
    getDialogsData,
    updateDialogsData
})(Dialogs)

export default DialogsContainer;
