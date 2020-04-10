import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DialogItem from "./Components/Dialogs/DialogItem/DialogItem";
import css from "./Components/Dialogs/Dialogs.module.css";
import Message from "./Components/Dialogs/Message/Message";
import Post from "./Components/Profile/MyPosts/Post/Post";
import state from "./redux/state"




// convert objects into real  posts


ReactDOM.render(
  <React.StrictMode>
    <App
        state={state}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
