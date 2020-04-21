import React from 'react'
import Dialogs from "./Dialogs";
import {addMessage,updateMessageText} from "../../redux/state";
import {connect} from "react-redux";


let mapStateToProps = (state) => {// данные со стэйта
    return {
        state: state.dialogsPage
    }
}

const DialogsContainer = connect(mapStateToProps, {updateMessageText, addMessage})(Dialogs)

export default DialogsContainer;
