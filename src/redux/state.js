const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const ADD_COMMENT = 'ADD-COMMENT'
const UPDATE_COMMENT_TEXT = 'UPDATE-COMMENT-TEXT'

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT'

export const addPost = (userUid, photoURL, name) => ({type: ADD_POST, userUid, photoURL, name})
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
export const signUp = (email, password, name, photoURL, backgroundPhotoUrl, usersCount) => ({
    type: 'SIGN_UP',
    email,
    password,
    name,
    photoURL,
    backgroundPhotoUrl,
    usersCount
})

export const getUsers = (userUid, users, followsData) => ({type: 'GET_USERS', userUid, users, followsData})
export const getFollows = (currentUser, followsData) => ({type: 'GET_FRIENDS', currentUser, followsData})
export const setIsLoaded = (isLoaded) => ({type: 'SET_IS_LOADED', isLoaded})
export const setPosts = (postsData) => ({type: 'SET_POSTS_FROM_DB', postsData})
export const addLike = (id, uid) => ({type: 'TOGGLE_LIKE', id, uid})
export const addDislike = (id, uid) => ({type: 'TOGGLE_DISLIKE', id, uid})

export const addMessage = (photo, id) => ({type: ADD_MESSAGE, photoUrl: photo, id})
export const updateMessageText = (text, id) => ({
    type: UPDATE_MESSAGE_TEXT,
    newText: text,
    id: id
})

export const addFollow = (id, uid, currentUser, userUid, currentUserId) => ({
    type: 'FOLLOW-UNFOLLOW',
    userId: id,
    uid,
    currentUser,
    userUid,
    currentUserId
})
export const setUsers = (id, usersData, currentUserId) => ({
    type: 'SET-USERS',
    id, usersData, currentUserId
})

export const toggleIsFetching = (isFetching) => ({type: 'TOGGLE_IS_FETCHING', isFetching})
export const setIsFetching = (isFetching) => ({type: 'SET_IS_FETCHING', isFetching})

