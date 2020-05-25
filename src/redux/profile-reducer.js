import firebase from "../firebase";
import React from "react";
import {usersAPI} from "./api";
import {setUser} from "./auth-reducer";
import * as axios from "axios";

const getStringMonth = (index) => {
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
        'september', 'october', 'november', 'december']
    return months[index]
}
export let getStringDate = () => `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')} ${new Date()
    .getDate()} ${getStringMonth(new Date().getMonth())}  ${new Date().getFullYear()}`



const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_CURRENT_USER_PROFILE = 'SET_CURRENT_USER_PROFILE'

const SET_POSTS = 'SET_POSTS'
const SET_IS_FETCHING = 'SET_IS_FETCHING'

const SET_USERS_FOLLOWS_FOLLOWERS = 'SET_USERS_FOLLOWS_FOLLOWERS'

const SET_IS_USER_LOADED = 'SET_IS_USER_LOADED'
const SET_IS_CURRENT_LOADED = 'SET_IS_CURRENT_LOADED'


let initialState = {
    postsData: [],// all posts
    followsData: [],
    followersData: [],
    user: null,// user who is login
    currentUserProfile: {},// on whose profile page I am
    isFetching: false,// for loader on posts
    isUserLoaded: false,//for loader user who is login
    isCurrentUserLoaded: false // for loader user on whose page I am
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            console.log(action.user)
            return {
                ...state,
                user: action.user
            }
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
            return {
                ...state,
                followsData: [...action.followsData],
                followersData: [...action.followersData]
            }
        }
        case SET_IS_USER_LOADED:
            return {
                ...state,
                isUserLoaded: action.isUserLoaded
            }
        case SET_CURRENT_USER_PROFILE:
            return {
                ...state,
                currentUserProfile: action.currentUserProfile,
                isCurrentUserLoaded: action.isCurrentUserLoaded
            }
        case SET_IS_CURRENT_LOADED:
            return{
                ...state,
                isCurrentUserLoaded: action.isCurrentUserLoaded
            }
        default:
            return state
    }
}

// ***Action Creators
export const setUserProfile = user => ({type: SET_USER_PROFILE, user})
export const setCurrentUserProfile = (currentUserProfile, isCurrentUserLoaded) => ({type: SET_CURRENT_USER_PROFILE, currentUserProfile, isCurrentUserLoaded })
export const setPosts = (postsData) => ({type: SET_POSTS, postsData})

export const setUsersFollowsFollowers = (followsData, followersData) => ({
    type: SET_USERS_FOLLOWS_FOLLOWERS,
    followsData,
    followersData
})


export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
export const setIsUserLoaded = (isUserLoaded) => ({type: SET_IS_USER_LOADED, isUserLoaded})
export const setIsCurrentUserLoaded = (isCurrentUserLoaded) => ({type: SET_CURRENT_USER_PROFILE, isCurrentUserLoaded})

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
                    }
                })
                users.splice(currentUserPlace, 1)// удаляю из списка текущего пользователя
                users = users.map(item => ({
                    ...item
                }))
                usersAPI.getUser(userUidFromURL !== undefined && ['myPosts', 'friends', 'followers', 'album'].indexOf(userUidFromURL) === -1
                    ? userUidFromURL : user.uid)
                    .then(data => {
                        let currentUserProfile = data.data()
                        dispatch(setCurrentUserProfile(currentUserProfile, true))
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
                        dispatch(setUsersFollowsFollowers(friends, followers))
                        //dispatch(setIsUserLoaded(true))
                    }).catch(error => {
                        console.log(error)
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
            userUid,
            whosePostUserUid
        }
        postsData = [newPost, ...postsData]
        dispatch(setPosts(postsData))
        firebase.firestore().collection('postsData').doc(newPost.uid).set(newPost)// добавляю в базу запись с новым постом, которая имеет кастомный айди
    }
}

export const addCommentThunk = (postsData, idComment, photoURL, name, whoseCommentUid, newCommentText) => (dispatch) => {

    if (newCommentText) {
        let newComment = {
            image: photoURL,
            name: name,
            dateOfPublishing: getStringDate(),
            text: newCommentText, //state.profilePage.postsData.newCommentText
            whoseCommentUid
        }
        postsData[idComment - 1].comments = [...postsData[idComment - 1].comments, newComment]
        dispatch(setPosts(postsData))
        firebase.firestore().collection('postsData').doc(postsData[idComment - 1].uid).set({
            ...postsData[idComment - 1],
        })// добавляю в базу комментарий
    }
}

export const authListenerThunk = () => (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let newUser
            firebase.firestore().collection('users').where('uid', '==', user.uid).get()
                .then(response => {
                    response.forEach(doc => {
                        newUser = doc.data()
                        dispatch(setUserProfile(newUser))
                        dispatch(setIsUserLoaded(true))
                    })// для зашедшего пользователя подгружается личная информация с базы
                }).catch(error => {

                dispatch(setIsUserLoaded(true))
                console.log(error)
            })
        } else {
            dispatch(setIsUserLoaded(true))
            dispatch(setUserProfile(null))
        }
    })
}

export const uploadImageThunk = (user, name, file) => (dispatch) => {
    //setUserPhoto(e.target.name e.target.files[0])
    //let image = file.files[0]
    //let name = file.name
    console.log(file)
    dispatch(setIsCurrentUserLoaded(false))
    firebase.storage().ref(`images/${user.uid}/${file.name}`).put(file).on('state_changed',
        (snapshot) => {
        },
        (error) => {
            console.log(error)
        },
        () => {
            firebase.storage().ref(`images/${user.uid}`).child(file.name).getDownloadURL().then(url => {
                firebase.firestore().collection('users').doc(user.uid).set({
                    [name]: url,
                    photos: [url, ...user.photos]
                }, {merge: true}).then(() => {
                    dispatch(setUserProfile({
                        ...user,
                        [name]: url
                    }))
                })
            })
        })
}

export const changeProfilePhotoThunk = (user, photoURL, name) => (dispatch) => {
    firebase.firestore().collection('users').doc(user.uid).set({
        [name]: photoURL
    }, {merge: true}).then(() => {
        dispatch(setUserProfile({
            ...user,
            [name]: photoURL
        }))
    })
}

export const deletePhotoThunk = (user, id, photos) => (dispatch) => {

    photos.splice(id, 1)
    firebase.firestore().collection('users').doc(user.uid).set({
        photos
    }, {merge: true}).then(() => dispatch(setUserProfile({
        ...user,
        photos
    })))

}