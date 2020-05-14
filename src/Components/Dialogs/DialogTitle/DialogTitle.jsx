import React from 'react'
import css from './DialogTitle.module.css'
import { NavLink } from "react-router-dom";

const DialogTitle = props => {
    return <div className={css.dialog__title}>
        {/* Arrow 'back' will be shown only in mobile/tablet versions  */}
        {!props.isDesktopVersion ? <NavLink to={'/dialogs'} className={css.dialog__back}><i class="fas fa-chevron-left"></i></NavLink> : ''}
        <NavLink to={`/profile/${props.currentUserDialog.uid}/myPosts`} className={css.dialog__imgWrapper}>
            <img src={props.currentUserDialog.photoURL} alt="" />
        </NavLink>
        <div className={css.dialog__info}>
            <NavLink to={`/profile/${props.currentUserDialog.uid}/myPosts`} className={css.dialog__name}>{props.currentUserDialog.name}</NavLink>
            <p className={css.dialog__userStatus}>{props.currentUserDialog.state === 'online' ? 'В сети' : 'Не в сети'}</p>
        </div>
    </div>
}

export default DialogTitle;