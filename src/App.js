import React from 'react'
import './App.css'
import Header from './Components/Header/Header';
import NavBar from './Components/NavBar/NavBar';
import Profile from './Components/Profile/Profile';
import {BrowserRouter, Route} from "react-router-dom";
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from './Components/Settings/Settings';
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import firebase from "./firebase";
import LoginPage from "./Components/Login/LoginPage";
import {LoginContainer} from "./Components/Login/LoginContainer";

class App extends React.Component {
    constructor(props) {
        super(props)
        //this.signUp = this.signUp.bind(this)
        //this.login = this.login.bind(this)
        this.authListener = this.authListener.bind(this)
        this.state = {
            user: {},
            isLoaded: false
        }
    }

    componentDidMount = () => {
        this.authListener()
    }

    /*signUp = (e, email, password, name, photoURL) => {
        e.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(email, password).then(u => {
            console.log(u.user.uid)
            const db = firebase.firestore()
            db.collection('users').doc(u.user.uid).set({
                email, password, name, photoURL, uid: u.user.uid
            })// пользователь добавляется в базу
        }).catch(error => {
            console.log(error)
        })
    }

    login = (e, email, password) => {
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(email, password).then(u => {
        }).catch((error) => {
            console.log("email: ", this.state.email, error)
        })
    }*/
    authListener = () => {
        //this.setState({isFetching: true})
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let newUser
                const db = firebase.firestore()
                db.collection('users').where('uid', '==', user.uid).get().then(response => {
                    //console.log(response)
                    response.forEach(doc => {
                        newUser = doc.data()
                        //console.log(doc.id, '=> ', doc.data())
                        this.setState({user: newUser})
                        this.setState({isLoaded: true})
                        console.log(this.state.user)
                    })// для зашедшего пользователя подгружается личная информация с базы
                }).catch(error => {
                    this.setState({isLoaded: true})
                    console.log(error)
                })
            } else {
                this.setState({isLoaded: true})
                this.setState({user: null})
            }
        })
    }

    render() {
        //console.log(this.state.user)
        return (
            <BrowserRouter>
                <Header user={this.state.user}/>
                {this.state.isLoaded ? this.state.user ? <div className='app-wrapper'>
                    <NavBar/>
                    <div className='app-wrapper-content bg-shadow'>
                        <Route path='/dialogs'
                               render={() => <DialogsContainer/>}/>
                        <Route path='/profile/:myPosts?'
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
/*  var firebaseConfig = {
    apiKey: "AIzaSyAVqntvEOYxFeOkhpzdHc6PO4fZuSrfzvg",
    authDomain: "social-network-react-redux.firebaseapp.com",
    databaseURL: "https://social-network-react-redux.firebaseio.com",
    projectId: "social-network-react-redux",
    storageBucket: "social-network-react-redux.appspot.com",
    messagingSenderId: "419369044262",
    appId: "1:419369044262:web:41b557998d41d21ec559e7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);*/