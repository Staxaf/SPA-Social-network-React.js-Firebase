import React from 'react'
import css from './User.module.css'
import {NavLink} from "react-router-dom";


const User = (props) => {
    console.log(props.isFollow)
    return (
        <div className={css.user}>
            <NavLink to={'/profile/' + props.userUid + '/myPosts' } className={css.user__photo}>
                <img src={props.photoUrl} alt=""/>
            </NavLink>
            <div className={css.user__info}>
                <h4>{props.fullName}</h4>
            </div>
            <div className="user__button">
                <button onClick={() => {
                    props.addFollow(props.id, props.uid, props.currentUser, props.userUid, props.users)
                }}>{props.isFollow ? 'Unfollow' : 'Follow'}</button>
            </div>
        </div>
    )
}

export default User;