import React from 'react'
import {connect} from "react-redux";
import LoginPage from "./LoginPage";
import {loginThunk, setUser,  signUpThunk} from "../../redux/auth-reducer";
import {withRouter} from "react-router-dom";


const mapStateToProps = (state) => ({
    email: state.authPage.email,
    password: state.authPage.password,
    name: state.authPage.name,
    photoURL: state.authPage.photoURL,
    usersData: state.usersPage.usersData,
    isError: state.authPage.isError,
    signError: state.authPage.signError
})

export const LoginContainer = connect(mapStateToProps, {setUser,  loginThunk, signUpThunk})(withRouter(LoginPage))
