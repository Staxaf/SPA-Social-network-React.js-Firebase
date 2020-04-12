import React from 'react'
import css from './DialogItem.module.css'
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={css.dialog}>
            <div className={css.dialog__image}>
                <img src={props.image} alt=""/>
            </div>
            <div className={css.dialog__info}>
                <div className={css.dialog__title}>
                    <NavLink className={css.dialog__name} to={path} >{props.name}</NavLink>
                    <p>18:34</p>
                </div>
                <div className={css.dialog__undertitle}>
                    <a className={`${css.dialog__name} text-blue`} href="#">Elena:</a>
                    <p className={css.dialog__message}>Hello world</p>
                </div>
            </div>
        </div>
    )
}


export default DialogItem;