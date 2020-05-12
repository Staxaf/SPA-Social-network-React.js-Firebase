import React from 'react'
import css from './DialogItem.module.css'
import {NavLink} from 'react-router-dom';


const DialogItem = (props) => {
    return (
        <NavLink activeClassName={css.active} to={props.path} className={css.dialog}>
            <div className={css.dialog__image}>
                <img src={props.image} alt=""/>
                <div className={`${css.dialog__circleWrapper} whiteCircle`}>
                    <div className={`${css.dialog__circle} ${props.state === 'online' ? ' greenCircle' : ' greyCircle'}` }  />
                </div>
            </div>
            <div className={css.dialog__info}>
                <div className={css.dialog__title}>
                    <p className={css.dialog__name}>{props.name}</p>
                    <p>18:34</p>
                </div>
                {!props.isEmpty ? <div className={css.dialog__undertitle}>
                    <a className={`${css.dialog__name} text-blue`}
                       href="#">{props.isMyLastMessage ? 'You:' : `${props.name.split(' ')[0]}:`}</a>{/*с помощью split получаю имя пользователя */}
                    <p className={css.dialog__message}>{props.lastMessage.length > 20 ? `${props.lastMessage.slice(0, 20)}...` : props.lastMessage}</p>
                </div> : <p className='text-grey'>Now dialog is empty...</p>}
            </div>
        </NavLink>
    )
}


export default DialogItem;