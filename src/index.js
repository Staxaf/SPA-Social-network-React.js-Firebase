import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store  from "./redux/redux-store";

let renderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App
                store={store}
            />
        </React.StrictMode>,
        document.getElementById('root')
    );

}
// eslint-disable-next-line no-undef
renderEntireTree(store.getState())

store.subscribe(() => {
    renderEntireTree(store.getState()) //передается обновленный state при изменении каких-то данных
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
