import React from 'react'
import css from './Comment.module.css'

const Comment = (props) => {

    return (
        <div className={css.comment}>
           <div className={css.comment__image}>
               <img src={props.image} alt=""/>
           </div>
            <div className={css.comment__info}>
                <p><span className={css.comment__name}>{props.name}:</span> {props.text}</p>
            </div>
        </div>

    )
}

export default Comment;