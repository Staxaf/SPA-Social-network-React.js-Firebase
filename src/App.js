import React from 'react'
import './App.css'
import Header from './Components/Header/Header';
import NavBar from './Components/NavBar/NavBar';
import Profile from './Components/Profile/Profile';
import Dialogs from './Components/Dialogs/Dialogs';
import {BrowserRouter, Route} from "react-router-dom";
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from './Components/Settings/Settings';
import DialogItem from "./Components/Dialogs/DialogItem/DialogItem";
import css from "./Components/Dialogs/Dialogs.module.css";
import Message from "./Components/Dialogs/Message/Message";
import Post from "./Components/Profile/MyPosts/Post/Post";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";

const App = (props) => {


    return (
        <BrowserRouter>
            <Header/>
            <div className='app-wrapper'>
                <NavBar/>
                {/* <Profile name='Anton Mazurenko' birthYear='2001' gender='male'  /> */}
                <div className='app-wrapper-content bg-shadow'>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer store={props.store} />}/>
                    <Route path='/profile'
                           render={() => <Profile store={props.store}/>}/>
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
