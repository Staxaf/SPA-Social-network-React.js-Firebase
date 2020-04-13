import React from 'react'
import Dialogs from "./Dialogs";
import {addMessageCreator, updateNewCommentText, updateNewMessageText} from "../../redux/state";


const DialogsContainer = (props) => {
    debugger
// Convert objects into jsx tag
    let addMessage = () => {
        props.store.dispatch(addMessageCreator())
        //props.addMessage(messageArea.current.value)
    }

    let onMessageChange = (text) => {
        props.store.dispatch(updateNewMessageText(text))
        //props.updateMessageText(messageArea.current.value)
    }


    return (
        <Dialogs addMessage={addMessage} updateMessageText={onMessageChange} state={props.store.getState().dialogsPage}
                 newMessageText={props.store.getState().dialogsPage.newMessageText}/>
    )
}

export default DialogsContainer;