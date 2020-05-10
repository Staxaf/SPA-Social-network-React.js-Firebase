import firebase from "../firebase";
import React from "react";
import {usersAPI} from "./api";
import {setCurrentUser} from "./users-reducer";
import {setUser} from "./auth-reducer";

const getStringMonth = (index) => {
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
        'september', 'october', 'november', 'december']
    return months[index]
}
export let getStringDate = () => `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')} ${new Date()
    .getDate()} ${getStringMonth(new Date().getMonth())}  ${new Date().getFullYear()}`


const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const UPDATE_COMMENT_TEXT = 'UPDATE-COMMENT-TEXT'
const SET_USER = 'SET_USER'

const SET_POSTS = 'SET_POSTS'
const SET_IS_FETCHING = 'SET_IS_FETCHING'

const SET_USERS_FOLLOWS_FOLLOWERS = 'SET_USERS_FOLLOWS_FOLLOWERS'
const GET_FOLLOWS = 'GET_FOLLOWS'
//const SET_USER = 'SET_USER'

const SET_IS_LOADED = 'SET_IS_LOADED'
const SET_IS_USER_LOADED = 'SET_IS_USER_LOADED'
const SET_CURRENT_USER_PROFILE = 'SET_CURRENT_USER_PROFILE'

const SET_MODAL_MESSAGE_WINDOW = 'SET_MODAL_MESSAGE_WINDOW'

let initialState = {
    usersData: [],
    postsData: [],// all posts
    followsData: [],
    followersData: [],
    name: '',// user name
    profileImage: '',
    currentUserProfile: {},
    newPostText: '',// text in adding post textarea
    isFetching: false,// for loader
    isLoaded: false,//for loader friends
    isUserLoaded: false,//for loader current User
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                name: action.name,
                profileImage: action.photoURL
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case UPDATE_COMMENT_TEXT:
            let stateCopy = {
                ...state,
                postsData: [...state.postsData]
            }
            stateCopy.postsData[action.idComment - 1].newCommentText = action.newText
            return stateCopy
        case SET_POSTS:
            return {
                ...state,
                postsData: [...action.postsData]
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_USERS_FOLLOWS_FOLLOWERS: {
            let stateCopy = {
                ...state,
                usersData: [...action.users],
                followsData: [...action.followsData],
                followersData: [...action.followersData]
            }
            stateCopy.isLoaded = true
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
        case SET_IS_USER_LOADED:
            return {
                ...state,
                isUserLoaded: action.isUserLoaded
            }
        case SET_CURRENT_USER_PROFILE:
            return {
                ...state,
                currentUserProfile: {...action.currentUserProfile}
            }
        case SET_MODAL_MESSAGE_WINDOW:
            return {
                ...state,
                isModalMessageOpen: action.isModalMessageOpen
            }
        default:
            return state
    }
}

// ***Action Creators

export const onPostChange = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
})
export const onCommentChange = (text, id) => ({
    type: UPDATE_COMMENT_TEXT,
    idComment: id,
    newText: text
})
export const setPosts = (postsData) => ({type: SET_POSTS, postsData})

export const setUsersFollowsFollowers = (userUid, users, followsData, followersData) => ({
    type: SET_USERS_FOLLOWS_FOLLOWERS,
    userUid,
    users,
    followsData,
    followersData
})

export const getFollows = (currentUser, followsData) => ({type: GET_FOLLOWS, currentUser, followsData})
export const setIsLoaded = (isLoaded) => ({type: SET_IS_LOADED, isLoaded})

export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
export const setIsUserLoaded = (isUserLoaded) => ({type: SET_IS_USER_LOADED, isUserLoaded})

export const setModalMessageWindow = (isModalMessageOpen) => ({type: SET_MODAL_MESSAGE_WINDOW, isModalMessageOpen})
// ***Redux Thunks

export const getUsersFollowsAndFollowers = (user, userUidFromURL) => (dispatch) => {
    usersAPI.getUsers()
        .then(data => {
            let users = data.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id,
            }))
            let currentUserPlace = 0
            users.forEach((item, i) => {
                if (item.uid === user.uid) {
                    currentUserPlace = i
                    // this.currentUser = item
                }
            })
            users.splice(currentUserPlace, 1)// удаляю из списка текущего пользователя
            users = users.map(item => ({
                ...item
            }))
            usersAPI.getUser(userUidFromURL !== undefined && ['myPosts', 'friends', 'followers'].indexOf(userUidFromURL) === -1
                ? userUidFromURL : user.uid)
                .then(data => {
                    let currentUserProfile = data.data()
                    dispatch(setCurrentUser(currentUserProfile))
                    dispatch(setUser(currentUserProfile.name, currentUserProfile.photoURL, currentUserProfile.uid))
                    let followsOfCurrentUser = []
                    let followersOfCurrentUser = []
                    if (currentUserProfile.follows !== undefined) followsOfCurrentUser = currentUserProfile.follows// получаю текущие подписки пользователя
                    if (currentUserProfile.followers !== undefined) followersOfCurrentUser = currentUserProfile.followers// получаю текущих подписчиков пользователя
                    let friends = []
                    let followers = []
                    users.forEach(item => {
                        if (followsOfCurrentUser.indexOf(item.uid) !== -1) friends = [...friends, item]
                    })
                    users.forEach(item => {
                        if (followersOfCurrentUser.indexOf(item.uid) !== -1) followers = [...followers, item]
                    })
                    if (followsOfCurrentUser.indexOf(user.uid) !== -1) friends = [...friends, user]// проверяю есть ли залогиненый пользователь у другого пользователя в подписках и подписчиках
                    if (followersOfCurrentUser.indexOf(user.uid) !== -1) followers = [...followers, user]
                    dispatch(setUsersFollowsFollowers(user.uid, users, friends, followers))
                    dispatch(setIsUserLoaded(true))
                })

        })
}

export const getUserPosts = (uid) => (dispatch) => {

    dispatch(setIsFetching(true))
    firebase.firestore().collection('postsData')
        .where('userUid', '==', uid)
        .get()
        .then(response => {//
            let postsData = response.docs.map(doc => ({...doc.data()}))
            postsData.sort((a, b) => {// фильтрую посты по возрастанию id
                if (a.id > b.id) return 1
                else if (a.id < b.id) return -1
                else return 0
            })
            dispatch(setPosts(postsData))// достаю из базы все посты
            dispatch(setIsFetching(false))
        }).catch(error => {
        dispatch(setIsFetching(false))
        console.log('Ошибка', error)
    })
}

export const toggleLikeThunk = (postsData, id, uid, currentUserUid) => (dispatch) => {

    postsData[id - 1].whoIsLikeList = [...postsData[id - 1].whoIsLikeList]
    if (postsData[id - 1].whoIsLikeList.indexOf(currentUserUid) === -1) {
        postsData[id - 1].whoIsLikeList = [...postsData[id - 1].whoIsLikeList, currentUserUid]
    } else {
        postsData[id - 1].whoIsLikeList.splice(postsData[id - 1].whoIsLikeList.indexOf(currentUserUid), 1)
    }
    dispatch(setPosts(postsData))
    firebase.firestore().collection('postsData').doc(uid).set({
        ...postsData[id - 1]
    })
}

export const toggleDislikeThunk = (postsData, id, uid, currentUserUid) => (dispatch) => {
    postsData[id - 1].whoIsDislikeList = [...postsData[id - 1].whoIsDislikeList]
    if (postsData[id - 1].whoIsDislikeList.indexOf(currentUserUid) === -1) {
        postsData[id - 1].whoIsDislikeList = [...postsData[id - 1].whoIsDislikeList, currentUserUid]
    } else {
        postsData[id - 1].whoIsDislikeList.splice(postsData[id - 1].whoIsDislikeList.indexOf(currentUserUid), 1)
    }
    dispatch(setPosts(postsData))
    firebase.firestore().collection('postsData').doc(uid).set({
        ...postsData[id - 1]
    })
}

export const addPostThunk = (newPostText, postsData, photoURL, name, userUid, whosePostUserUid) => (dispatch) => {
    if (newPostText.length > 0 && postsData !== undefined) {
        let i = 0
        postsData.forEach((item, i) => {
            firebase.firestore().collection('postsData').doc(item.uid).set({
                ...item,
                id: item.id + 1
            })
            item.id++
        })// все id в базе и в локальном стейте увеличиваю на 1, чтобы вставить новый пост на первое место
        console.log('i: ', i)
        let newPost = {
            id: 1,
            message: newPostText,
            postImage: photoURL,
            postName: name,
            whoIsLikeList: [],
            whoIsDislikeList: [],
            viewCounts: 0,
            dateOfPublishing: getStringDate(),
            comments: [],
            uid: `id${postsData.length}${userUid}`,
            userUid: userUid,
            whosePostUserUid
        }
        postsData = [newPost, ...postsData]
        dispatch(setPosts(postsData))
        dispatch(onPostChange(''))
        firebase.firestore().collection('postsData').doc(newPost.uid).set(newPost)// добавляю в базу запись с новым постом, которая имеет кастомный айди
    }
}

export const addCommentThunk = (postsData, idComment, photoURL, name, whoseCommentUid) => (dispatch) => {

    if (postsData[idComment - 1].newCommentText.length > 0) {
        let newComment = {
            image: photoURL,
            name: name,
            dateOfPublishing: getStringDate(),
            text: postsData[idComment - 1].newCommentText, //state.profilePage.postsData.newCommentText
            whoseCommentUid
        }
        postsData[idComment - 1].newCommentText = ''
        postsData[idComment - 1].comments = [...postsData[idComment - 1].comments, newComment]
        dispatch(setPosts(postsData))
        firebase.firestore().collection('postsData').doc(postsData[idComment - 1].uid).set({
            ...postsData[idComment - 1],
        })// добавляю в базу комментарий
    }
}
