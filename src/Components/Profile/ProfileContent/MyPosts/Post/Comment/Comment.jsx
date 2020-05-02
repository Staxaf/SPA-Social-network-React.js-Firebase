import React from 'react'
import css from './Comment.module.css'
import {NavLink} from "react-router-dom";

const Comment = (props) => {
    return (
        <div className={css.comment}>
           <div className={css.comment__image}>
               <NavLink onClick={() => {
                   props.getUserPosts(props.userUid)
                   props.getUsersFollowsAndFollowers(props.user, props.userUid)
               }} to={`/profile/${props.userUid}/myPosts`}><img src={props.image} alt=""/></NavLink>
           </div>
            <div className={css.comment__info}>
                <div className={css.comment__title}>
                    <NavLink onClick={() => {
                        props.getUserPosts(props.userUid)
                        props.getUsersFollowsAndFollowers(props.user, props.userUid)
                    }} to={`/profile/${props.userUid}/myPosts`} className={css.comment__name}>{props.name}</NavLink>
                    <p className={css.comment__date}>{props.dateOfPublishing}</p>
                </div>
                    <p>{props.text}</p>
            </div>
        </div>

    )
}

export default Comment;