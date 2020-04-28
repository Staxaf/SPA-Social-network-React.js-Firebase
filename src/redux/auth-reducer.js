import firebase from "./../firebase";

const SET_USER = 'SET_USER'
const LOGIN = 'LOGIN'
const SIGN_UP = 'SIGN_UP'

let initialState = {
    email: '',
    password: '',
    name: '',
    photoURL: '',
    uid: '',
    follows: []
}

export const authReducer = (state = initialState, action) => {
    const db = firebase.firestore()
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                name: action.name,
                profileImage: action.photoURL,
                uid: action.uid
            }
        case LOGIN:
            firebase.auth().signInWithEmailAndPassword(action.email, action.password).then(u => {

            }).catch((error) => {
                console.log(error)
            })
            return {
                ...state
            }
        case SIGN_UP:
            firebase.auth().createUserWithEmailAndPassword(action.email, action.password).then(u => {
                console.log(u.user.uid)
                const db = firebase.firestore()
                db.collection('users').doc(u.user.uid).set({
                    email: action.email,
                    password: action.password,
                    name: action.name,
                    photoURL: action.photoURL,
                    uid: u.user.uid,
                    follows: [],
                    followers: [],
                    backgroundPhotoUrl: action.backgroundPhotoUrl,
                    id: action.usersCount
                })// пользователь добавляется в базу
                return {
                    ...state,
                    uid: u.user.uid,
                }
            }).catch(error => {
                console.log(error)
            })
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}

// Action Creators

export const setUser = (name, photoURL, uid) => ({type: SET_USER, name, photoURL, uid})
export const login = (email, password) => ({type: LOGIN, email, password})
export const signUp = (email, password, name, photoURL, backgroundPhotoUrl, usersCount) => ({
    type: SIGN_UP,
    email,
    password,
    name,
    photoURL,
    backgroundPhotoUrl,
    usersCount
})