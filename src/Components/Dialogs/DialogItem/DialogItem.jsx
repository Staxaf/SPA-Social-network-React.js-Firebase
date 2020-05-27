import React, {useEffect} from 'react'
import css from './DialogItem.module.css'
import {NavLink} from 'react-router-dom';


const DialogItem = (props) => {

    return (
        <NavLink onClick={() => {
            props.resetUnreadMessages(props.dialogUid, props.owners, props.userDialogId)
        }} activeClassName={css.active} to={props.path} className={css.dialog}>
            <div className={css.dialog__image}>
                <img src={props.image} alt=""/>
            </div>
            <div className={css.dialog__info}>
                <div className={css.dialog__title}>
                    <p className={css.dialog__name}>{props.name}</p>
                    <p>{props.time && props.time.split(' ')[0]}</p>
                </div>
                {!props.isEmpty ? <div className={css.dialog__undertitle}>
                    <div className={css.dialog__undertitleWrapper}><span className={`${css.dialog__name} text-blue`}
                               href="#">{props.isMyLastMessage ? 'You:' : `${props.name.split(' ')[0]}:`}</span>{/*с помощью split получаю имя пользователя */}
                        <p className={css.dialog__message}>{props.lastMessage.length > 20 ? `${props.lastMessage.slice(0, 20)}...` : props.lastMessage}</p></div>
                    {props.unreadMessages !== 0 && props.paramsUserUid !== props.dialogUid && <span className={css.dialog__unreadMessages}>{props.unreadMessages}</span>}
                </div> : <p className='text-grey'>Now dialog is empty...</p>}

            </div>
        </NavLink>
    )
}


export default DialogItem;