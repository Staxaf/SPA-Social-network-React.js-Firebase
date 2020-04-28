import React from 'react'
import {connect} from "react-redux";
import LoginPage from "./LoginPage";
import {login, setUser, signUp} from "../../redux/auth-reducer";


const mapStateToProps = (state) => ({
    email: state.authPage.email,
    password: state.authPage.password,
    name: state.authPage.name,
    photoURL: state.authPage.photoURL
})

export const LoginContainer = connect(mapStateToProps, {setUser, login, signUp})(LoginPage)
