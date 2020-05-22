import React from 'react'
import css from "./Dialogs.module.css";
import {Field, reduxForm} from "redux-form";

const MessageForm = props => {
    return <form className={css.messages__input} onSubmit={props.handleSubmit}>
                <Field component="textarea" name={`newMessageText${props.id}`} placeholder="Send a message..." cols="30" rows="10" />
        {props.isChanging ? <button className={css.message__send}><i className="fas fa-check"/></button> :
            <button type='submit' className={css.message__send}>
                <i className="fab fa-telegram-plane"/>
            </button>}
    </form>
}

export default reduxForm({
    form: 'addMessage'
})(MessageForm)