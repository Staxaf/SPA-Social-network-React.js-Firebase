import React from 'react'
import css from "../Login.module.css";
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../commonComponents/FormsControls";
import {
    isEquals,
    maxLengthCreator,
    minLengthCreator,
    required,
    validateConfirmPassword, validateEmail
} from "../../../utils/validators/validators";

const MaxLength25 = maxLengthCreator(25)// validate name field
const MinLength6 = minLengthCreator(6)// validate password field

let SignUpForm = props => {
    console.log(props.error)
    return <form onSubmit={props.handleSubmit} className={css.login__inputs}>
        <Field type="text" name="name" required={true} component={Input} placeholder="Full name..."
               validate={[required, MaxLength25, MinLength6]}/>
        <Field type="text" name="email" required={true} component={Input} placeholder="Email..." validate={[required, validateEmail]}/>
        <Field type="password" name="password" required={true} component={Input} placeholder="Password..."
               validate={[required, MinLength6]}/>
        <Field type="password" name="confirmPassword" required={true} component={Input}
               placeholder="Confirm password..." validate={[required, validateConfirmPassword]}/>
        <div>
            <NavLink to='/'>
                <span className={css.login__link}>Comeback to login</span>
            </NavLink>
        </div>
        <div className={css.login__buton}>
            <button>Sign Up</button>
        </div>
        {props.error && <div className={css.login__error}>
            Something went wrong.
        </div>}
    </form>
}

SignUpForm = reduxForm({
    form: 'signUp'
})(SignUpForm)

const SignUp = props => {

    const onSubmit = values => {
        console.log(values)
        props.signUp(values.email, values.password, values.name, values.confirmPassword)

    }

    return (
        <div className={css.login__container}>
            <h1>Sign Up</h1>
            <SignUpForm onSubmit={onSubmit}/>
        </div>
    )
}

export default SignUp