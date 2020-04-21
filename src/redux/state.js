
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const ADD_COMMENT = 'ADD-COMMENT'
const UPDATE_COMMENT_TEXT = 'UPDATE-COMMENT-TEXT'

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT'

export const addPost = () => ({type: ADD_POST})
export const onPostChange = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
})
export const addComment = (id) => ({type: ADD_COMMENT, idComment: id})
export const onCommentChange = (text, id) => ({
    type: UPDATE_COMMENT_TEXT,
    idComment: id,
    newText: text
})

export const setPosts = (postsData) => ({type: 'SET_POSTS_FROM_DB', postsData})

export const addMessage = (photo, id) => ({type: ADD_MESSAGE, photoUrl: photo, id: id})
export const updateMessageText = (text, id) => ({
    type: UPDATE_MESSAGE_TEXT,
    newText: text,
    id: id
})

export const addFollow = (id, uid) => ({type: 'FOLLOW-UNFOLLOW', userId: id, uid})
export const setUsers = (id, usersData) => ({
    type: 'SET-USERS',
    id, usersData
})

export const toggleIsFetching = (isFetching) => ({type: 'TOGGLE_IS_FETCHING', isFetching})
export const setIsFetching = (isFetching) => ({type: 'SET_IS_FETCHING', isFetching})
