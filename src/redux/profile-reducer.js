import firebase from "../firebase";
import React from "react";

const getStringMonth = (index) => {
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
        'september', 'october', 'november', 'december']
    return months[index]
}
export let getStringDate = () => `${new Date().getHours()}:${new Date().getMinutes()} ${new Date()
    .getDate()} ${getStringMonth(new Date().getMonth())}  ${new Date().getFullYear()}`


const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const ADD_COMMENT = 'ADD-COMMENT'
const UPDATE_COMMENT_TEXT = 'UPDATE-COMMENT-TEXT'

const SET_POSTS_FROM_DB = 'SET_POSTS_FROM_DB'
const SET_IS_FETCHING = 'SET_IS_FETCHING'

const TOGGLE_LIKE = 'TOGGLE_LIKE'
const TOGGLE_DISLIKE = 'TOGGLE_DISLIKE'

const GET_USERS = 'GET_USERS'
const GET_FOLLOWS = 'GET_FOLLOWS'
const SET_USER = 'SET_USER'

const SET_IS_LOADED = 'SET_IS_LOADED'

let initialState = {
    usersData: [],
    postsData: [],// all posts
    followsData: [],
    followersData: [],
    name: '',// user name
    profileImage: '',
    newPostText: '',// text in adding post textarea
    isFetching: false,// for loader
    isLoaded: false//for loader friends
}

export const profileReducer = (state = initialState, action) => {
    const db = firebase.firestore()
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                name: action.name,
                profileImage: action.photoURL
            }
        case ADD_POST:
            if (state.newPostText.length > 0 && state.postsData !== undefined) {
                let i = 0
                state.postsData.forEach((item, i) => {
                    db.collection('postsData').doc(item.uid).set({
                        ...item,
                        id: item.id + 1
                    })
                    item.id++
                })// все id в базе и в локальном стейте увеличиваю на 1, чтобы вставить новый пост на первое место
                console.log('i: ', i)
                let newPost = {
                    id: 1,
                    message: state.newPostText,
                    postImage: action.photoURL,
                    postName: action.name,
                    whoIsLikeList: [],
                    whoIsDislikeList: [],
                    viewCounts: 0,
                    dateOfPublishing: getStringDate(),
                    comments: [],
                    uid: `id${state.postsData.length}${action.userUid}`,
                    userUid: action.userUid
                }
                db.collection('postsData').doc(newPost.uid).set(newPost)// добавляю в базу запись с новым постом, которая имеет кастомный айди
                return {
                    ...state,
                    postsData: [newPost, ...state.postsData],
                    newPostText: ''
                }
            }
            return state
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case ADD_COMMENT: {
            let stateCopy
            if (state.postsData[action.idComment - 1].newCommentText.length > 0) {
                stateCopy = {
                    ...state,
                    postsData: [...state.postsData]
                };
                let newComment = {
                    image: action.photoURL,
                    name: action.name,
                    dateOfPublishing: getStringDate(),
                    text: stateCopy.postsData[action.idComment - 1].newCommentText //state.profilePage.postsData.newCommentText
                }
                stateCopy.postsData[action.idComment - 1].newCommentText = ''
                stateCopy.postsData[action.idComment - 1].comments = [...stateCopy.postsData[action.idComment - 1].comments, newComment]
                db.collection('postsData').doc(stateCopy.postsData[action.idComment - 1].uid).set({
                    ...stateCopy.postsData[action.idComment - 1],
                })// добавляю в базу комментарий

                return stateCopy
            }
            return state
        }
        case UPDATE_COMMENT_TEXT:
            let stateCopy = {
                ...state,
                postsData: [...state.postsData]
            }
            stateCopy.postsData[action.idComment - 1].newCommentText = action.newText
            return stateCopy
        case SET_POSTS_FROM_DB:
            return {
                ...state,
                postsData: action.postsData
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_LIKE: {
            let newState = {
                ...state,
                postsData: [...state.postsData]
            }
            newState.postsData[action.id - 1].whoIsLikeList = [...newState.postsData[action.id - 1].whoIsLikeList]
            if (newState.postsData[action.id - 1].whoIsLikeList.indexOf(action.currentUserUid) === -1) {
                newState.postsData[action.id - 1].whoIsLikeList = [...newState.postsData[action.id - 1].whoIsLikeList, action.currentUserUid]
            } else {
                newState.postsData[action.id - 1].whoIsLikeList.splice(newState.postsData[action.id - 1].whoIsLikeList.indexOf(action.currentUserUid), 1)
            }
            db.collection('postsData').doc(action.uid).set({
                ...newState.postsData[action.id - 1]
            })
            return newState
        }
        case TOGGLE_DISLIKE:
            debugger
            let newState = {
                ...state,
                postsData: [...state.postsData]
            }
            newState.postsData[action.id - 1].whoIsDislikeList = [...newState.postsData[action.id - 1].whoIsDislikeList]
            if (newState.postsData[action.id - 1].whoIsDislikeList.indexOf(action.currentUserUid) === -1) {
                newState.postsData[action.id - 1].whoIsDislikeList = [...newState.postsData[action.id - 1].whoIsDislikeList, action.currentUserUid]
            } else {
                newState.postsData[action.id - 1].whoIsDislikeList.splice(newState.postsData[action.id - 1].whoIsDislikeList.indexOf(action.currentUserUid), 1)
            }
            db.collection('postsData').doc(action.uid).set({
                ...newState.postsData[action.id - 1]
            })
            return newState
        case GET_USERS: {

            let stateCopy = {
                ...state,
                usersData: [...action.users],
                followsData: [...action.followsData]
            }
            if (stateCopy.followsData.length !== 0) stateCopy.isLoaded = true
            return stateCopy
        }
        case GET_FOLLOWS:
            return {
                ...state,
                followsData: [...action.followsData]
            }
        case SET_IS_LOADED:
            return {
                ...state,
                isLoaded: action.isLoaded
            }
        default:
            return state
    }
}

// Action Creators

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
export const setPosts = (postsData) => ({type: SET_POSTS_FROM_DB, postsData})
export const addLike = (id, uid, whoIsLikeList, currentUserUid) => ({type: TOGGLE_LIKE, id, uid, whoIsLikeList, currentUserUid})
export const addDislike = (id, uid, whoIsDislikeList, currentUserUid) => ({type: TOGGLE_DISLIKE, id, uid, whoIsDislikeList, currentUserUid})
export const getUsers = (userUid, users, followsData) => ({type: GET_USERS, userUid, users, followsData})

export const getFollows = (currentUser, followsData) => ({type: GET_FOLLOWS, currentUser, followsData})
export const setIsLoaded = (isLoaded) => ({type: SET_IS_LOADED, isLoaded})

export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
