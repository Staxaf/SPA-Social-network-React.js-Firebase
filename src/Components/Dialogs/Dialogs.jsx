import React, {useEffect, useState} from 'react'
import css from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {NavLink, Route} from "react-router-dom";
import DialogTitle from './DialogTitle/DialogTitle';


const Dialogs = (props) => {
    const [width, setWidth] = useState(0)// for tracking width of screen, because on desktop will be dialogs and messages on one screen, 
    //but on mobile dialogs will be hidden when each dialog is selected
    const [currentUserDialog, setCurrentUserDialog] = useState({})

    useEffect(() => {
        if (props.match.params.userUid) {
            props.usersData.forEach(item => {
                if (props.match.params.userUid.indexOf(item.uid.substr(0, 8)) !== -1) setCurrentUserDialog(item)
            })
        }
        console.log(currentUserDialog)
    })

    useEffect(() => {
        let updateWindowDemisions = () => {
            setWidth(window.innerWidth)
        }

        props.getUsers(props.user, 0)
        updateWindowDemisions()
        window.addEventListener('resize', updateWindowDemisions)
        props.getDialogsData(props.user.uid)
        return () => {
            window.removeEventListener('resize', updateWindowDemisions)// remove listener when component unmount
        }
    }, [])


    // Convert objects into jsx tag
    //const [userDialog, setUserDialog] = useState({})
    let userDialog = {}
    let ownerId = 0
    let dialogsData = props.state.dialogsData.map(dialog => {// получаю индекс текущего залогиненого пользователя в массиве owners, а также получаю юзера с кем ведется диалог
        // и получаю массив диалогов в jsx
        dialog.owners.forEach((item, i) => {
            if (item.uid !== props.user.uid) userDialog = item //setUserDialog(item)
            else ownerId = i
        })
        return <DialogItem
            path={'/dialogs/' + dialog.uid} image={userDialog.photoURL} name={userDialog.name}
            lastMessage={dialog.messagesData.length !== 0 ? dialog.messagesData[dialog.messagesData.length - 1].message : ''}
            isMyLastMessage={dialog.messagesData.length !== 0 ?
                dialog.messagesData[dialog.messagesData.length - 1].userUid === props.user.uid : false}
            isEmpty={dialog.messagesData.length === 0}/>
    })
    // формирую разметку сообщений и отдельно для каждого диалога своя textarea и кнопка, чтобы сохранять черновики для каждого диалога отдельно
    let messagesData = props.state.dialogsData.map(dialog => <Route path={'/dialogs/' + dialog.uid} render={() => {
        let content = dialog.messagesData.map(message => <Message dialogId={dialog.id} dialogUid={dialog.uid} userName={message.userName} dialogsData={props.state.dialogsData}
                                                                  time={message.date.split(' ')[0]}
                                                                  message={message.message} id={message.id}
                                                                  photoUrl={message.photoUrl} userUid={message.userUid}
                                                                  ownerId={ownerId}
                                                                  isMyMessage={message.userUid === props.user.uid}
                                                                  changeMessage={props.changeMessage} deleteMessage={props.deleteMessageThunk}/>)
        return <div className={css.dialogs__content}>
            <DialogTitle currentUserDialog={currentUserDialog} isDesktopVersion={width > 900}/>
            <div className={css.messages}>
                {content}
            </div>
            <div className={css.messages__input}>
                <textarea onChange={(e) => {
                    props.updateMessageText(e.target.value, dialog.id, ownerId)
                }} value={dialog.owners[ownerId].newMessageText} cols="30" rows="10"
                          placeholder='Send a message...'/>
                {dialog.isChanging ? <button onClick={() => {
                        props.confirmChangeMessage(props.state.dialogsData, dialog.id, dialog.changingMessageId, ownerId, dialog.uid)
                    }
                    } className={css.message__send}><i className="fas fa-check"/></button> :
                    <button type='submit' onClick={() => {
                        props.addMessage(props.user.photoURL, dialog.id, ownerId, props.user.uid, props.user.name)
                        props.updateDialogsData(dialog)
                    }} className={css.message__send}>
                        <i className="fab fa-telegram-plane"/>
                    </button>}
            </div>
        </div>
    }
    }/>)
    return (
        <div className={css.dialogs}>
            {/* on mobile phone and tablet will show only dialogs or messages */}
            {width < 900 ? <Route exact path='/dialogs' render={() => <div className={css.dialogs__items}>
                {dialogsData}
            </div>}/> : <Route path='/dialogs' render={() => <div className={css.dialogs__items}>
                {dialogsData}
            </div>}/>}
            <div className={css.messages__bg}>
                {messagesData}
            </div>
        </div>
    )
}

export default Dialogs;