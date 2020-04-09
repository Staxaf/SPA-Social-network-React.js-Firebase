import React from 'react'
import css from './Dialogs.module.css'
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={props.styles}>
            <NavLink to={path} >{props.name}</NavLink>
        </div>
    )
}

const Message = (props) => {
    return (
    <div className={css.message}>{props.message}</div>
    )
}

const Dialogs = (props) => {

    let dialogsData = [
        {id: 1, name: 'Magluar'},
        {id: 2, name: 'Sasha'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Vlad'},
        {id: 5, name: 'Katya'},
        {id: 6, name: 'Anatoliy'},
    ]

    let messagesData = [
        {id: 1, message: 'Hi!'},
        {id: 2, message: 'How your english is going?'},
        {id: 3, message: 'ahaha, LOL'},
        {id: 4, message: 'My name is Anton'},
        {id: 5, message: 'Oh,nice! Goodbye'},
    ]

    // Convert objects into jsx tag
    dialogsData = dialogsData.map( dialog => <DialogItem name={dialog.name} id={dialog.id} styles={css.dialog} /> )
    messagesData = messagesData.map( message => <Message message={message.message} id={message.id} /> )

    return (
        <div className={css.dialogs}>
            <div className={css.dialogs__items}>
                {dialogsData}
            </div>
            <div className={css.messages}>
                {messagesData}
            </div>
        </div>
    )
}

export default Dialogs;