import React from 'react'
import css from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom';



const Message = (props) => {
    return (
    <div className={css.message}>{props.message}</div>
    )
}



export default Message;