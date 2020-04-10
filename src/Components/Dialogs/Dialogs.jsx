import React from 'react'
import css from './Dialogs.module.css'
import { NavLink } from 'react-router-dom';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";




const Dialogs = (props) => {


// Convert objects into jsx tag
    let dialogsData = props.state.dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} image={dialog.image}/>)
    let messagesData = props.state.messagesData.map(message => <Message message={message.message} id={message.id}/>)

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
                    <textarea cols="30" rows="10" placeholder='Send a message...'></textarea>
                    <button className={css.message__send}>
                        <i className="fab fa-telegram-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;