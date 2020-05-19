import firebase from "./../firebase";

const SET_USER = 'SET_USER'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
const SET_ERROR = 'SET_ERROR'

let initialState = {
    email: '',
    password: '',
    name: '',
    photoURL: '',
    uid: '',
    follows: [],
    signError: {},// info about error
    isError: false,// if while login of signUp pop an error
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                name: action.name,
                profileImage: action.photoURL,
                uid: action.uid
            }
        case SET_ERROR_MESSAGE:{
            let stateCopy = {...state}
            stateCopy.signError = {...state.signError}
            stateCopy.signError = {
                errorPlace: action.errorPlace,
                errorMessage: action.errorMessage
            }
            return stateCopy
        }
        case SET_ERROR:
            return {
                ...state,
                isError: action.isError
            }
        default:
            return {
                ...state
            }
    }
}

// Action Creators

export const setUser = (name, photoURL, uid) => ({type: SET_USER, name, photoURL, uid})
export const setErrorMessage = (errorPlace, errorMessage) => ({type: SET_ERROR_MESSAGE, errorPlace, errorMessage})
export const setError = (isError) => ({type: SET_ERROR, isError})

// ***Redux Thunks

export const loginThunk = (email, password) => (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        dispatch(setError(false))
    }).catch((error) => {
        dispatch(setError(true))
        switch (error.code) {
            case 'auth/invalid-email':
                dispatch(setErrorMessage('signUp', 'Email is not correct'))
                break
            case 'auth/wrong-password':
                dispatch(setErrorMessage('signUp', 'Password is not correct'))
                break
            case 'auth/user-not-found':
                dispatch(setErrorMessage('signUp', 'User email is not found'))
                break
            default:
                break
        }
        console.log(error.code)
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
            id: usersCount,
            photos: [photoURL]
        })// пользователь добавляется в базу

    }).catch(error => {
        console.log(error)
    })
}