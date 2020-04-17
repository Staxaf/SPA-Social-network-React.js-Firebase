import React from 'react'
import Dialogs from "./Dialogs";
import {addMessageCreator,updateNewCommentTextCreator, updateNewMessageTextCreator} from "../../redux/state";
import {connect} from "react-redux";


let mapStateToProps = (state) => {// данные со стэйта
    return {
        state: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch) => {// колбэки
    return {
        updateMessageText: (text, id) => {
            dispatch(updateNewMessageTextCreator(text, id))
        },
        addMessage: (photo, id) => {
            dispatch(addMessageCreator(photo, id))
        },

    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;
