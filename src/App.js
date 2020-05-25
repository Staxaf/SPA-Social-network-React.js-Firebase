import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './Components/Header/Header';
import NavBar from './Components/NavBar/NavBar';
import { BrowserRouter, Route } from "react-router-dom";
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from './Components/Settings/Settings';
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import firebase from "./firebase";
import { LoginContainer } from "./Components/Login/LoginContainer";
import {connect} from "react-redux";
import {authListenerThunk} from "./redux/profile-reducer";

class App extends React.Component {

    componentDidMount = () => {
        this.props.authListenerThunk()
    }

    render() {
        return (
            <BrowserRouter>
                <Header user={this.props.user} />
                {this.props.isUserLoaded ? this.props.user ? <div className='app-wrapper'>
                    <NavBar user={this.props.user} />
                    <div className='app-wrapper-content bg-shadow'>
                        <Route path='/dialogs/:userUid?'
                            render={() => <DialogsContainer />} />
                        <Route path='/profile/:userUid?/:myPosts?'
                            render={() => <ProfileContainer />} />
                        <Route path='/users'
                            render={() => <UsersContainer />} />
                        <Route path='/news' render={() => <News />} />
                        <Route path='/music' render={() => <Music />} />
                        <Route path='/settings' render={() => <Settings />} />
                    </div>
                </div> : <LoginContainer /> : ''}
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.profilePage.user,
        isUserLoaded: state.profilePage.isUserLoaded
    }
}

export default connect(mapStateToProps, {authListenerThunk})(App);
