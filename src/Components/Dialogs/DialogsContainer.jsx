import React from 'react'
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessage, updateMessageText} from "../../redux/dialogs-reducer";


let mapStateToProps = (state) => {// данные со стэйта
    return {
        state: state.dialogsPage
    }
}

const DialogsContainer = connect(mapStateToProps, {updateMessageText, addMessage})(Dialogs)

export default DialogsContainer;
