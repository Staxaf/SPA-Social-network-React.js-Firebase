import React from 'react'
import css from "./Login.module.css";
import firebase from "./../../firebase";
import {NavLink} from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
            photoURL: ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    render = () => {
        return <div className={css.login__container}>
            <h2 className={css.login__h2}>
                Login to Continue
            </h2>
            <div className={css.login__inputs}>
                <input type="email" name="email" onChange={this.handleChange} placeholder='Email...'/>
                <input type="password" name="password" onChange={this.handleChange} placeholder='Password...'/>
            </div>
            <div className={css.login__links}>
                <div className={css.login__forgot}>
                    <a href="#">Forgot password?</a>
                </div>
                <div className={css.login__signup}>
                    <NavLink to='/signup' >Sign Up</NavLink>
                </div>
            </div>
            <div className={css.login__buton}>
                <NavLink to={'/news'}><button onClick={() => {
                    this.props.login(this.state.email, this.state.password)
                }}>Login</button></NavLink>
            </div>
        </div>

    }
}

export default Login