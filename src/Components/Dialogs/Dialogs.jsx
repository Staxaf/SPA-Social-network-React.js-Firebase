import React, {useEffect, useRef, useState} from 'react'
import css from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Route} from "react-router-dom";
import DialogTitle from './DialogTitle/DialogTitle';
import {reduxForm} from "redux-form";

let MessageForm = props => {
    return <form className={css.messages__input}>
                <textarea onChange={(e) => {
                    props.updateMessageText(e.target.value, props.dialog.id, props.ownerId)
                }} value={props.dialog.owners[props.ownerId].newMessageText} cols="30" rows="10"
                          placeholder='Send a message...'/>
        {props.dialog.isChanging ? <button onClick={() => {
                props.confirmChangeMessage(props.state.dialogsData, props.dialog.id, props.dialog.changingMessageId, props.ownerId, props.dialog.uid)
            }
            } className={css.message__send}><i className="fas fa-check"/></button> :
            <button type='submit' onClick={() => {
                props.addMessageThunk(props.state.dialogsData, props.user.photoURL, props.dialog.id, props.ownerId, props.user.uid, props.user.name)
                props.updateDialogsData(props.dialog)
            }} className={css.message__send}>
                <i className="fab fa-telegram-plane"/>
            </button>}
    </form>
}

MessageForm = reduxForm({
    form: 'addComment'
})(MessageForm)

const Dialogs = (props) => {
    const [width, setWidth] = useState(0)// for tracking width of screen, because on desktop will be dialogs and messages on one screen, 
    //but on mobile dialogs will be hidden when each dialog is selected
    const [currentUserDialog, setCurrentUserDialog] = useState({})
    const scrollTo = ref => {
        if (ref) {
            ref.scrollTo(0, 999999999)
        }
    }
    const findCurrentUserDialog = () => {
        if (props.match.params.userUid) {
            props.usersData.forEach(item => {
                if (props.match.params.userUid.indexOf(item.uid.substr(0, 8)) !== -1) setCurrentUserDialog(item)
            })
        }
    }
    useEffect(() => {
        findCurrentUserDialog()
    }, [props.match.params])
    useEffect(() => {
        findCurrentUserDialog()
    }, [props.usersData])

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
    let userDialogId = 0
    let ownerId = 0
    let dialogsData = props.state.dialogsData.map((dialog, key) => {// get index of current user in array owners, also getting user
        //who is the dialogue with and getting an array of dialogs in jsx
        dialog.owners.forEach((item, i) => {
            if (item.uid !== props.user.uid) userDialogId = i
            else ownerId = i
        })
        return <DialogItem key={key} dialogUid={dialog.uid} owners={dialog.owners} userDialogId={userDialogId}
                           paramsUserUid={props.match.params.userUid}
                           path={'/dialogs/' + dialog.uid} image={dialog.owners[userDialogId].photoURL}
                           name={dialog.owners[userDialogId].name}
                           messagesData={dialog.messagesData}
                           lastMessage={dialog.messagesData.length !== 0 ? dialog.messagesData[dialog.messagesData.length - 1].message : ''}
                           isMyLastMessage={dialog.messagesData.length !== 0 ?
                               dialog.messagesData[dialog.messagesData.length - 1].userUid === props.user.uid : false}
                           unreadMessages={dialog.owners[userDialogId].unreadMessages}
                           isEmpty={dialog.messagesData.length === 0}
                           time={dialog.messagesData.length !== 0 ? dialog.messagesData[dialog.messagesData.length - 1].date : false}
                           resetUnreadMessages={props.resetUnreadMessages}/>
    })
    // формирую разметку сообщений и отдельно для каждого диалога своя textarea и кнопка, чтобы сохранять черновики для каждого диалога отдельно
    let messagesData = props.state.dialogsData.map((dialog, key) => <Route key={key} path={'/dialogs/' + dialog.uid} render={() => {
        let content = dialog.messagesData.map((message, key) => <Message key={key} dialogId={dialog.id}
                                                                         dialogUid={dialog.uid}
                                                                         userName={message.userName}
                                                                         dialogsData={props.state.dialogsData}
                                                                         time={message.date.split(' ')[0]}
                                                                         message={message.message} id={message.id}
                                                                         photoUrl={message.photoUrl}
                                                                         userUid={message.userUid}
                                                                         ownerId={ownerId}
                                                                         isMyMessage={message.userUid === props.user.uid}
                                                                         changeMessage={props.changeMessage}
                                                                         deleteMessage={props.deleteMessageThunk}/>)
        return <div className={css.dialogs__content}>
            <DialogTitle currentUserDialog={currentUserDialog} isDesktopVersion={width > 900}/>
            <div className={css.messages} ref={scrollTo}>
                {content}
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