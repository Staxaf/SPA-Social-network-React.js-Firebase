import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {renderEntireTree} from "./render";
import state from "./redux/state";



// convert objects into real  posts

// eslint-disable-next-line no-undef
renderEntireTree(state)
//addPost("Hello world. Its javascript, React")


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
