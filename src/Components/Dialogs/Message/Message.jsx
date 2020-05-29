import React, {useState} from 'react'
import css from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom';
import PopUpWindow from "../../Profile/ProfileContent/Album/AlbumItem/PopUpWindow";



const Message = (props) => {
    const [isMessagePhotoDisplay, setIsMessagePhotoDisplay] = useState(false)
    return (
        <div className={`${css.message} ${props.isMyMessage ? css.myMessage: ''}`}>
            {isMessagePhotoDisplay && <PopUpWindow photoURL={props.uploadedMessagePhoto} isProfilePhoto={true}
                                                   setIsOpen={() => setIsMessagePhotoDisplay(false)} />}
            <div className={css.message__photo}>
                <NavLink to={`/profile/${props.userUid}/myPosts`}><img src={props.photoUrl} alt=""/></NavLink>
            </div>
            <div className={css.message__content}>
                <div className={css.message__title}>
                    <NavLink className={css.message__name} to={`/profile/${props.userUid}/myPosts`}>{props.userName.split(' ')[0]}</NavLink>
                    <div className={css.message__info}>
                        {props.isMyMessage ? <button onClick={() => {props.deleteMessage(props.dialogUid, props.dialogId, props.id, props.dialogsData)}} className={css.message__button_change}><i className="far fa-trash-alt" /></button> : ''}
                        {props.isMyMessage ? <button onClick={() => {
                            props.setNewMessageText(props.message)
                            props.setIsMessageChanging(true)
                            props.changeMessage(props.dialogId, props.message, props.ownerId, props.id)
                        }} className={css.message__button_change}><i className="fas fa-sync-alt" /></button> : ''}
                        <p className={css.message__time}>{props.time}</p>
                    </div>
                </div>
                <p className={css.message__text}>{props.message}</p>
                {props.uploadedMessagePhoto && <div className={css.message__uploadedImage}>
                    <img onClick={() => setIsMessagePhotoDisplay(true)} src={props.uploadedMessagePhoto} alt=""/>
                </div>}
            </div>
        </div>
    )
}



export default Message;