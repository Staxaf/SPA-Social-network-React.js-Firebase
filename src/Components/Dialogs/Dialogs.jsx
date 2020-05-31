import React, {useEffect, useRef, useState} from 'react'
import css from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Route} from "react-router-dom";
import DialogTitle from './DialogTitle/DialogTitle';
import {reduxForm} from "redux-form";

const Dialogs = (props) => {
    const [width, setWidth] = useState(0)// for tracking width of screen, because on desktop will be dialogs and messages on one screen, 
    //but on mobile dialogs will be hidden when each dialog is selected
    const [currentUserDialog, setCurrentUserDialog] = useState({})
    const [newMessageText, setNewMessageText] = useState('')
    const [isMessageChanging, setIsMessageChanging] = useState(false)
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
        console.table(currentUserDialog.photoURL)
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

    const onPhotoChange = (e) => {
        if(e.target.files[0]){
            props.uploadMessagePhoto(props.user, e.target.files[0])
        }
    }

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
                                                                         photoUrl={message.userUid === props.user.uid ?
                                                                             dialog.owners[ownerId].photoURL : dialog.owners[userDialogId].photoURL}
                                                                         userUid={message.userUid}
                                                                         ownerId={ownerId} uploadedMessagePhoto={message.uploadedMessagePhoto}
                                                                         isMyMessage={message.userUid === props.user.uid}
                                                                         changeMessage={props.changeMessage}
                                                                         deleteMessage={props.deleteMessageThunk} setIsMessageChanging={setIsMessageChanging}
                                                                            setNewMessageText={setNewMessageText}/>)
        return <div className={css.dialogs__messagesWrapper}>
        <div className={css.dialogs__content}>
            <DialogTitle currentUserDialog={currentUserDialog} isDesktopVersion={width > 900}/>
            <div className={`${css.messages} ${css.messages__bg}`} ref={scrollTo}>
                {content}
            </div>
            <div className={css.dialogs__scrollBtn}>
                <button><i className="fas fa-angle-down"></i></button>
            </div>
            <div className={css.dialogs__absolute}>
                <div className={css.message__inputWrapper}>
                    {props.state.uploadedMessagePhoto !== '' && <div className={css.dialogs__uploadedImage}>
                        <img src={props.state.uploadedMessagePhoto} alt=""/>
                        <button onClick={() => props.setUploadedMessagePhoto('')} className={css.dialogs__close}><i className="fas fa-times" /></button>
                    </div>}
                    {isMessageChanging && <div className={css.dialogs__uploadedImage}>
                        <span className={css.dialogs__editIcon}><i className="fas fa-pencil-alt" /></span>
                        <h6>Editing the message</h6>
                        <button onClick={() => {
                            setIsMessageChanging(false)
                            setNewMessageText('')
                        }} className={css.dialogs__close}><i className="fas fa-times" /></button>
                    </div>}
                    <div className={css.messages__input}>
                    <textarea onChange={(e) => {
                        setNewMessageText(e.target.value)
                    }} value={newMessageText} cols="30" rows="10"
                              placeholder='Send a message...'/>
                        <div className={css.icon__attach}>
                            <input onChange={onPhotoChange} type="file" accept=".jpg" name="myPostPhoto" id="myPostPhoto"/>
                            <label htmlFor="myPostPhoto"><i className="fas fa-paperclip"/></label>
                        </div>
                        {isMessageChanging ? <button onClick={() => {
                                props.confirmChangeMessage(props.state.dialogsData, dialog.id, dialog.changingMessageId, ownerId, dialog.uid, newMessageText)
                                setNewMessageText('')
                                setIsMessageChanging(false)
                            }
                            } className={css.message__send}><i className="fas fa-check"/></button> :
                            <button type='submit' onClick={() => {
                                props.addMessageThunk(props.state.dialogsData, props.user.photoURL, dialog.id, ownerId, props.user.uid, props.user.name, newMessageText, props.state.uploadedMessagePhoto)
                                props.updateDialogsData(dialog)
                                setNewMessageText('')
                            }} className={css.message__send}>
                                <i className="fab fa-telegram-plane"/>
                            </button>}
                    </div>
                </div>
            </div>
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
            {messagesData}
        </div>
    )
}

export default Dialogs;