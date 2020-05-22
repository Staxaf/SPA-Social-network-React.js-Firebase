import React from 'react'
import css from './FormsControls.module.css'

export const Input = ({input, meta, placeholder, ...props}) => {
    return <div>
        <div className={`${css.form} ${meta.touched && meta.error && css.error}`}>
            <input {...input} {...props} />
            <label htmlFor='email' className={css.form__label}>
                <span className={css.label__content}>{placeholder}</span>
            </label>
        </div>
        {meta.submitFailed && meta.error !== undefined &&  <div>
            <span className={css.errorText}>{meta.error}</span>
        </div>}
    </div>

}