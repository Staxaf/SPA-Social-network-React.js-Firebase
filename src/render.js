import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import state, {
    addComment,
    addMessage,
    addPost,
    updateCommentText,
    updateMessageText,
    updateNewPostText
} from "./redux/state";

export let renderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App
                state={state}
                addPost={addPost}
                updateNewPostText={updateNewPostText}
                addMessage={addMessage}
                updateMessageText={updateMessageText}
                addComment={addComment}
                updateCommentText={updateCommentText}
            />
        </React.StrictMode>,
        document.getElementById('root')
    );

}