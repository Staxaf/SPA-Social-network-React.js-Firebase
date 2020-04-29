import React from 'react'
import {connect} from "react-redux";
import LoginPage from "./LoginPage";
import {loginThunk, setUser,  signUpThunk} from "../../redux/auth-reducer";


const mapStateToProps = (state) => ({
    email: state.authPage.email,
    password: state.authPage.password,
    name: state.authPage.name,
    photoURL: state.authPage.photoURL,
    usersData: state.usersPage.usersData
})

export const LoginContainer = connect(mapStateToProps, {setUser,  loginThunk, signUpThunk})(LoginPage)
