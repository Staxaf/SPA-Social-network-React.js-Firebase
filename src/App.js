import React, {useState, useEffect} from 'react'
import './App.css'
import Header from './Components/Header/Header';
import NavBar from './Components/NavBar/NavBar';
import Profile from './Components/Profile/Profile';
import { BrowserRouter, Route } from "react-router-dom";
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from './Components/Settings/Settings';
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import firebase from "./firebase";
import LoginPage from "./Components/Login/LoginPage";
import { LoginContainer } from "./Components/Login/LoginContainer";
import Loader from "react-loader-spinner";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.authListener = this.authListener.bind(this)
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
                const db = firebase.firestore()
                db.collection('users').where('uid', '==', user.uid).get()
                    .then(response => {
                    response.forEach(doc => {
                        newUser = doc.data()
                        this.setState({user: newUser, isLoaded: true})
                    })// для зашедшего пользователя подгружается личная информация с базы
                }).catch(error => {
                    this.setState({isLoaded: true})
                    console.log(error)
                })
            } else {
                this.setState({isLoaded: true, user: null})
            }
        })
    }

    render() {
        return (
            <BrowserRouter>
                <Header user={this.state.user}/>
                {this.state.isLoaded ? this.state.user ? <div className='app-wrapper'>
                    <NavBar user={this.state.user}/>
                    <div className='app-wrapper-content bg-shadow'>
                        <Route path='/dialogs'
                               render={() => <DialogsContainer user={this.state.user}/>}/>
                        <Route path='/profile/:userUid?/:myPosts?'
                               render={() => <ProfileContainer user={this.state.user} store={this.props.store}/>}/>
                        <Route path='/users'
                               render={() => <UsersContainer user={this.state.user} store={this.props.store}/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                    </div>
                </div> : <LoginContainer/> : '' }
            </BrowserRouter>
        );
    }
}

export default App;
