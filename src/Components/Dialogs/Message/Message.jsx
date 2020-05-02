import React from 'react'
import css from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom';



const Message = (props) => {
    return (
        <div className={`${css.message} ${props.isMyMessage ? css.myMessage: ''}`}>
            <div className={css.message__photo}>
                <NavLink to={`/profile/${props.userUid}/myPosts`}><img src={props.photoUrl} alt=""/></NavLink>
            </div>
            <div className={css.message__text}>
                {props.message}
            </div>
        </div>
    )
}



export default Message;