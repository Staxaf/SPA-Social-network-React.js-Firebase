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
import Loader from "react-loader-spinner";
import InactiveJS from 'inactivejs'

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

    setUserPresence = () => {
        const usersDocRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid); // Get a reference to the Users collection;
        const onlineRef = firebase.database().ref('.info/connected'); // Get a reference to the list of connections

        onlineRef.on('value', snapshot => {
            if(!snapshot.val()){
                usersDocRef.set({
                    online: false,
                }, { merge: true })
                 return
            }
            firebase.database()
                .ref(`/status/${firebase.auth().currentUser.uid}`)
                .onDisconnect() // Set up the disconnect hook
                .set('offline') // The value to be set for this key when the client disconnects
                .then(() => {
                    // Set the Firestore User's online status to true
                    usersDocRef.set({
                            online: true,
                        }, { merge: true });

                    // Let's also create a key in our real-time database
                    // The value is set to 'online'
                    firebase.database().ref(`/status/${firebase.auth().currentUser.uid}`).set('online');
                });
        });
        const onAway = () => {
            usersDocRef.set({
                online: false,
            }, {merge: true})
        }
        const onBack = () => {
            usersDocRef.set({
                online: true,
            }, {merge: true})
        }

        const inactiveInstance = new InactiveJS({// for marking online or offline user
            timeout: 60000,
            onAway,
            onBack
        });
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
                            this.setUserPresence()
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
                            render={() => <ProfileContainer user={this.state.user} store={this.props.store} />} />
                        <Route path='/users'
                            render={() => <UsersContainer user={this.state.user} store={this.props.store} />} />
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
