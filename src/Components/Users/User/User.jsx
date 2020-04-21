import React from 'react'
import css from './User.module.css'
import {NavLink} from "react-router-dom";



const User = (props) => {

    return (
        <div className={css.user}>
            <NavLink to={'/profile/' + props.id} className={css.user__photo}>
                <img src={props.photoUrl} alt=""/>
            </NavLink>
            <div className={css.user__info}>
                <h4>{props.fullName}</h4>
                <p>{`${props.location.city}, ${props.location.country}`}</p>
            </div>
            <div className={css.user__button}>
                <button onClick={() => {props.addFollow(props.id, props.uid)}}>{props.isFollow ? 'Unfollow' : 'Follow'}</button>
            </div>
        </div>
    )
}

export default User;