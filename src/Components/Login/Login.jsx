import React from 'react'
import css from "./Login.module.css";
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Input} from "../commonComponents/FormsControls";

const maxLength30 = maxLengthCreator(30)

let LoginForm = props => {

    return <form onSubmit={props.handleSubmit}>
        <div className={css.login__inputs}>
            <Field type="text" name="email" component={Input} required={true} placeholder="Email..." validate={[required]}/>
            <Field type="password" name="password" component={Input} required={true} placeholder="Password..." validate={[required]}/>
        </div>
        <div className={css.login__links}>
            <div className={css.login__forgot}>
                <a href="#">Forgot password?</a>
            </div>
            <div className={css.login__signup}>
                <NavLink to='/signup'>Sign Up</NavLink>
            </div>
        </div>
        <div className={css.login__buton}>
            <button>Login</button>
        </div>
    </form>
}

LoginForm = reduxForm({
    form: 'login'
})(LoginForm)


const Login = props => {

    const onSubmit = (values) => {
        props.login(values.email, values.password)
    }

    return <div className={css.login__container}>
        <h2 className={css.login__h2}>
            Login to Continue
        </h2>
        <LoginForm onSubmit={onSubmit}
                   login={props.login}/>
        {props.isError && props.signError.errorPlace === 'login' ?
            <div className={css.login__error}>{props.signError.errorMessage}</div> : ''}
    </div>

}

export default Login