import React from 'react'
import css from './Dialogs.module.css'
import { NavLink } from 'react-router-dom';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";




const Dialogs = (props) => {

// Convert objects into jsx tag
    let dialogsData = props.state.dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} image={dialog.image}/>)
    let messagesData = props.state.messagesData.map(message => <Message message={message.message} id={message.id}/>)


    let addMessage = () => {
        props.dispatch({type: 'ADD-MESSAGE'})
        //props.addMessage(messageArea.current.value)
    }

    let onMessageChange = (e) => {
        props.dispatch({type: 'UPDATE-MESSAGE-TEXT', newText: e.target.value})
        //props.updateMessageText(messageArea.current.value)
    }


    return (
        <div className={css.dialogs}>
            <div className={css.dialogs__items}>
                {dialogsData}
            </div>
            <div className={css.dialogs__content}>
                <div className={css.messages}>
                    {messagesData}
                </div>
                <div className={css.messages__input}>
                    <textarea onChange={onMessageChange} value={props.state.newMessageText} cols="30" rows="10" placeholder='Send a message...' />
                    <button type='submit' onClick={addMessage} className={css.message__send}>
                        <i className="fab fa-telegram-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;