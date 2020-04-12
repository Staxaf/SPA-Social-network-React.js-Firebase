import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store  from "./redux/state";

let renderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App
                state={state}
                dispatch={store.dispatch.bind(store)}
                // addPost={addPost}
                // updateNewPostText={updateNewPostText}
                // addMessage={addMessage}
                // updateMessageText={updateMessageText}
                // addComment={addComment}
                // updateCommentText={updateCommentText}
            />
        </React.StrictMode>,
        document.getElementById('root')
    );

}
// eslint-disable-next-line no-undef
renderEntireTree(store.getState())

store.subscribe(renderEntireTree)
//addPost("Hello world. Its javascript, React")


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
