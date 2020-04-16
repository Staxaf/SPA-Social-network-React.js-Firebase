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
        updateMessageText: (text) => {
            dispatch(updateNewMessageTextCreator(text))
        },
        addMessage: () => {
            dispatch(addMessageCreator())
        },

    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;

/*const DialogsContainer = (props) => {
    debugger
// Convert objects into jsx tags
    let addMessage = () => {
        props.store.dispatch(addMessageCreator())
        //props.addMessage(messageArea.current.value)
    }

    let onMessageChange = (text) => {
        props.store.dispatch(updateNewMessageTextCreator(text))
        //props.updateMessageText(messageArea.current.value)
    }


    return (
        <Dialogs addMessage={addMessage} updateMessageText={onMessageChange} state={props.store.getState().dialogsPage}
                 newMessageText={props.store.getState().dialogsPage.newMessageText}/>
    )
}*/