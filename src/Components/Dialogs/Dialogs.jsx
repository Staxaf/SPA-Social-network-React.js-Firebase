import React, {useEffect} from 'react'
import css from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Route} from "react-router-dom";


const Dialogs = (props) => {
    console.log(props)
    useEffect(() => {
        props.getDialogsData(props.user.uid)
    }, [])

    // Convert objects into jsx tag
    let userDialog = {}
    let ownerId = 0
    let dialogsData = props.state.dialogsData.map(dialog => {// получаю индекс текущего залогиненого пользователя в массиве owners, а также получаю юзера с кем ведется диалог
        dialog.owners.forEach((item, i) => {
            if (item.uid !== props.user.uid) userDialog = item
            else ownerId = i
        })
        return <DialogItem
            path={'/dialogs/' + dialog.uid} image={userDialog.photoURL} name={userDialog.name}
            lastMessage={dialog.messagesData.length !== 0 ? dialog.messagesData[dialog.messagesData.length - 1].message : ''}
            isMyLastMessage={dialog.messagesData.length !== 0 ? dialog.messagesData[dialog.messagesData.length - 1].userUid === props.user.uid : false}
            isEmpty={dialog.messagesData.length === 0 }/>
    })
    // формирую разметку сообщений и отдельно для каждого диалога своя textarea и кнопка, чтобы сохранять черновики для каждого диалога отдельно
    let messagesData = props.state.dialogsData.map(dialog => <Route path={'/dialogs/' + dialog.uid} render={() => {
        let content = dialog.messagesData.map(message => <Message message={message.message} id={message.id}
                                                                  photoUrl={message.photoUrl} userUid={message.userUid}
                                                                  isMyMessage={message.userUid === props.user.uid}/>)
        return <div className={css.dialogs__content}>
            <div className={css.messages}>
                {content}
            </div>
            <div className={css.messages__input}>
                    <textarea onChange={(e) => {
                        props.updateMessageText(e.target.value, dialog.id, ownerId)
                    }} value={dialog.owners[ownerId].newMessageText} cols="30" rows="10"
                              placeholder='Send a message...'/>
                <button type='submit' onClick={(addMessage => {
                    props.addMessage(dialog.owners[ownerId].photoURL, dialog.id, ownerId, props.user.uid)
                    props.updateDialogsData(dialog)
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