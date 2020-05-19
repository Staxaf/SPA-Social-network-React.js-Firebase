import React from 'react'
import css from './DialogTitle.module.css'
import { NavLink } from "react-router-dom";

const DialogTitle = props => {
    return <div className={css.dialog__title}>
        {/* Arrow 'back' will be shown only in mobile/tablet versions  */}
        {!props.isDesktopVersion ? <NavLink to={'/dialogs'} className={css.dialog__back}><i className="fas fa-chevron-left" /></NavLink> : ''}
        <NavLink to={`/profile/${props.currentUserDialog.uid}/myPosts`} className={css.dialog__imgWrapper}>
            <img src={props.currentUserDialog.photoURL} alt="" />
        </NavLink>
        <div className={css.dialog__info}>
            <NavLink to={`/profile/${props.currentUserDialog.uid}/myPosts`} className={css.dialog__name}>{props.currentUserDialog.name}</NavLink>
        </div>
    </div>
}

export default DialogTitle;