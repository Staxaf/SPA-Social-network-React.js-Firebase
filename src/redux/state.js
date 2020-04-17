
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const ADD_COMMENT = 'ADD-COMMENT'
const UPDATE_COMMENT_TEXT = 'UPDATE-COMMENT-TEXT'

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT'

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
})
export const addCommentCreator = (id) => ({type: ADD_COMMENT, idComment: id})
export const updateNewCommentTextCreator = (text, id) => ({
    type: UPDATE_COMMENT_TEXT,
    idComment: id,
    newText: text
})

export const addMessageCreator = (photo, id) => ({type: ADD_MESSAGE, photoUrl: photo, id: id})
export const updateNewMessageTextCreator = (text, id) => ({
    type: UPDATE_MESSAGE_TEXT,
    newText: text,
    id: id
})

export const addFollowCreator = (id) => ({type: 'FOLLOW-UNFOLLOW', userId: id})
export const setUsers = (id) => ({
    type: 'SET-USERS',
    id: id
})
