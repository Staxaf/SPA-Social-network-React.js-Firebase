import React from 'react'
import css from './User.module.css'
import { NavLink } from "react-router-dom";


const User = (props) => {
    return (
        <div className={css.user}>
            <div className={css.user__imgWrapper}>
                <NavLink to={'/profile/' + props.userUid + '/myPosts'} className={css.user__photo}>
                    <img src={props.photoUrl} alt="" />
                </NavLink>
            </div>
            <div className={css.user__info}>
                <NavLink to={'/profile/' + props.userUid + '/myPosts'}><h4 className={css.user__name}>{props.fullName}</h4></NavLink>
            </div>
            <div className="user__button">
                <button onClick={() => {
                    props.addFollow(props.id, props.uid, props.currentUser, props.userUid, props.users)
                }}>{props.isFollow ? 'Unfollow' : 'Follow'}
                </button>
            </div>
        </div>
    )
}

//<i class="fas fa-times-circle"></i> - uncheck
//<i class="fas fa-check-circle"></i> - check

export default User;