import firebase from './../firebase'
import {usersAPI} from "./api";

const FOLLOW_UNFOLLOW = 'FOLLOW_UNFOLLOW'
const SET_USERS = 'SET_USERS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const SET_CURRENT_USER = 'SET_CURRENT_USER'

let initialState = {
    usersData: [],
    isFetching: false,
    currentUser: {}
}

export const usersReducer = (state = initialState, action) => {
    const db = firebase.firestore()
    switch (action.type) {
        case SET_USERS:
            let newState = {...state, usersData: [...action.usersData]};
            for (let i = 0; i < 5; i++) {
                if (newState.usersData.length > action.id + i) {
                    newState.usersData[action.id + i].isDisplay = true
                }
            }
            return newState
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.user
            }
        default:
            return state
    }
}


// ***Action Creators

export const addFollow = (id, uid, currentUser, userUid, users) => ({
    type: FOLLOW_UNFOLLOW,
    userId: id,
    uid,
    currentUser,
    userUid,
    users
})
export const setUsers = (id, usersData) => ({
    type: SET_USERS,
    id, usersData
})

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const setCurrentUser = (user) => ({type: SET_CURRENT_USER, user})

// ***Redux Thunks

export const getUsers = (currentUser, lastUserId) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers()
        .then(data => {
            let users = data.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id,
            }))
            let currentUserPlace = 0
            let followsOfCurrentUser
            users.forEach((item, i) => {
                if (item.uid === currentUser.uid) {
                    followsOfCurrentUser = item.follows// сохраняю follows текущего залогиневшегося пользователя для того, чтобы всегда были достоверные данные
                    currentUserPlace = i
                }
            })
            users.splice(currentUserPlace, 1)// удаляю из списка текущего пользователя
            users = users.map((item, id) => ({
                ...item
            }))
            users = users.map(item => followsOfCurrentUser.indexOf(item.uid) !== -1 ? {
                ...item,
                isFollow: true
            } : {...item, isFollow: false})
            dispatch(setCurrentUser(currentUser))
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(lastUserId, users))// получаю всех пользователей из базы и передаю в функцию
        })
}

export const addFollowThunk = (userId, uid, currentUser, userUid, usersData) => (dispatch) => {
    let follows = []
    let followers = []
    usersData[userId].isFollow = !usersData[userId].isFollow
    dispatch(setUsers(0, usersData))
    firebase.firestore().collection('users').doc(currentUser.uid).get().then(u => {// получить текущего юзера, чтобы получить его фоловеров
        follows = u.data().follows
        followers = [... usersData[userId].followers]
        if (follows.indexOf(userUid) === -1) {
            //stateCopy.usersData[action.userId].isFollow = true
            usersAPI.setUser(uid, {// добавляю uid юзера, на которого подписались или убираю, если отписался
                ...currentUser,
                follows: Array.from(new Set([...follows, userUid]))
            })
            // firebase.firestore().collection('users').doc(uid).set({// добавляю uid юзера, на которого подписались или убираю, если отписался
            //     ...currentUser,
            //     follows: Array.from(new Set([...follows, userUid]))
            // })
                .then(() => {
                    firebase.firestore().collection('users').doc(userUid).set({
                        ...usersData[userId],
                        followers: Array.from(new Set([...followers, currentUser.uid])) // добавляю в массив followers пользователю, на которого подписались
                    })
                })
        } else {
            follows.splice(follows.indexOf(userUid), 1)
            followers.splice(followers.indexOf(uid), 1)
            firebase.firestore().collection('users').doc(uid).set({// добавляю uid юзера, на которого подписались или убираю, если отписался
                ...currentUser,
                follows: Array.from(new Set([...follows]))
            }).then(() => {
                firebase.firestore().collection('users').doc(userUid).set({
                    ...usersData[userId],
                    followers: Array.from(new Set([...followers])) // добавляю в массив followers пользователю, на которого подписались
                })
            })
        }
    })
}