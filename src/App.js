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

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            isLoaded: false
        }
    }

    componentDidMount = () => {
        this.authListener()
    }

    authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let newUser
                firebase.firestore().collection('users').where('uid', '==', user.uid).get()
                    .then(response => {
                        response.forEach(doc => {
                            newUser = doc.data()
                            this.setState({ user: newUser, isLoaded: true })
                        })// для зашедшего пользователя подгружается личная информация с базы
                    }).catch(error => {
                        this.setState({ isLoaded: true })
                        console.log(error)
                    })
            } else {
                this.setState({ isLoaded: true, user: null })

            }
        })
    }

    setUserPhoto = (user, name, photo) => {
        debugger
        console.log(this.state)
        this.setState({ user: {
            ...user,
                [name]: photo
            }})
    }

    render() {
        return (
            <BrowserRouter>
                <Header user={this.state.user} />
                {this.state.isLoaded ? this.state.user ? <div className='app-wrapper'>
                    <NavBar user={this.state.user} />
                    <div className='app-wrapper-content bg-shadow'>
                        <Route path='/dialogs/:userUid?'
                            render={() => <DialogsContainer user={this.state.user} />} />
                        <Route path='/profile/:userUid?/:myPosts?'
                            render={() => <ProfileContainer setUserPhoto={this.setUserPhoto} user={this.state.user} />} />
                        <Route path='/users'
                            render={() => <UsersContainer user={this.state.user} />} />
                        <Route path='/news' render={() => <News />} />
                        <Route path='/music' render={() => <Music />} />
                        <Route path='/settings' render={() => <Settings />} />
                    </div>
                </div> : <LoginContainer /> : ''}
            </BrowserRouter>
        );
    }
}

export default App;
