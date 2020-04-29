import firebase from "./../firebase";

const SET_USER = 'SET_USER'

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
        default:
            return {
                ...state
            }
    }
}

// Action Creators

export const setUser = (name, photoURL, uid) => ({type: SET_USER, name, photoURL, uid})

// ***Redux Thunks

export const loginThunk = (email, password) => (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
        console.log(error)
    })
}

export const signUpThunk =(email, password, name, photoURL, backgroundPhotoUrl, usersCount)=> (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(u => {
        console.log(u.user.uid)
        dispatch(setUser(name, photoURL, u.user.uid))
        firebase.firestore().collection('users').doc(u.user.uid).set({
            email: email,
            password: password,
            name: name,
            photoURL: photoURL,
            uid: u.user.uid,
            follows: [],
            followers: [],
            backgroundPhotoUrl: backgroundPhotoUrl,
            id: usersCount
        })// пользователь добавляется в базу

    }).catch(error => {
        console.log(error)
    })
}