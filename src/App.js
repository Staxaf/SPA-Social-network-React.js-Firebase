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

const App = (props) => {

    return (
        <BrowserRouter>
            <Header/>
            <div className='app-wrapper'>
                <NavBar/>
                {/* <Profile name='Anton Mazurenko' birthYear='2001' gender='male'  /> */}
                <div className='app-wrapper-content bg-shadow'>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer />}/>
                    <Route path='/profile'
                           render={() => <ProfileContainer store={props.store}/>}/>
                    <Route path='/users'
                           render={() => <UsersContainer store={props.store}/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
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