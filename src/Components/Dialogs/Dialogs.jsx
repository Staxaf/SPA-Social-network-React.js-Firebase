import React from 'react'
import css from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Route} from "react-router-dom";


const Dialogs = (props) => {

    // Convert objects into jsx tag
    let dialogsData = props.state.dialogsData.map(dialog => <DialogItem
                                            path={'/dialogs/' + dialog.id}
                                            name={dialog.name} id={dialog.id}
                                            image={dialog.image}
                                            lastMessage={dialog.messagesData[dialog.messagesData.length - 1].message}
                                            isMyLastMessage={dialog.messagesData[dialog.messagesData.length - 1].isMyMessage}/>)
    // формирую разметку сообщений и отдельно для каждого диалога своя textarea и кнопка, чтобы сохранять черновики для каждого диалога отдельно
    let messagesData = props.state.dialogsData.map(dialog => <Route path={'/dialogs/' + dialog.id} render={() => {
        let content = dialog.messagesData.map(message => <Message message={message.message} id={message.id}
                                                                  photoUrl={message.photoUrl}
                                                                  isMyMessage={message.isMyMessage}/>)
        return <div className={css.dialogs__content}>
            <div className={css.messages}>
                {content}
            </div>
            <div className={css.messages__input}>
                    <textarea onChange={(e) => {
                        props.updateMessageText(e.target.value, dialog.id)
                    }} value={dialog.newMessageText} cols="30" rows="10"
                              placeholder='Send a message...'/>
                <button type='submit' onClick={(addMessage => {
                    props.addMessage(props.state.profilePhotoUrl, dialog.id)
                })} className={css.message__send}>
                    <i className="fab fa-telegram-plane"/>
                </button>
            </div>
        </div>
    }
    }/>)
    return (
        <div className={css.dialogs}>
            <div className={css.dialogs__items}>
                {dialogsData}
            </div>
            <div className={css.messages__bg}>
                {messagesData}
            </div>
        </div>
    )
}

export default Dialogs;