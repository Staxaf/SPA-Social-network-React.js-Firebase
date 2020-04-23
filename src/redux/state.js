
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const ADD_COMMENT = 'ADD-COMMENT'
const UPDATE_COMMENT_TEXT = 'UPDATE-COMMENT-TEXT'

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT'

export const addPost = (userUid) => ({type: ADD_POST, userUid})
export const onPostChange = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
})
export const addComment = (id, photoURL, name) => ({type: ADD_COMMENT, idComment: id, photoURL, name})
export const onCommentChange = (text, id) => ({
    type: UPDATE_COMMENT_TEXT,
    idComment: id,
    newText: text
})

export const setUser = (name, photoURL, uid) => ({type: 'SET_USER', name, photoURL, uid})
export const login = (email, password) => ({type: 'LOGIN', email, password})
export const signUp = (email, password, name, photoURL) => ({type: 'SIGN_UP', email, password, name, photoURL})

export const setPosts = (postsData) => ({type: 'SET_POSTS_FROM_DB', postsData})
export const addLike = (id, uid) => ({type: 'TOGGLE_LIKE', id, uid})
export const addDislike = (id, uid) => ({type: 'TOGGLE_DISLIKE', id, uid})

export const addMessage = (photo, id) => ({type: ADD_MESSAGE, photoUrl: photo, id})
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

