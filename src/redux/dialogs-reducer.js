import firebase from './../firebase'
import {dialogsAPI, usersAPI} from "./api";

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT'
const SET_DIALOGS_DATA = 'SET_DIALOGS_DATA'

let initialState = {
    dialogsData: [],

}

export const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            if (state.dialogsData[action.id].owners[action.currentUserId].newMessageText.length > 0) {
                let newState = {
                    ...state,
                }
                newState.dialogsData[action.id].messagesData = [...newState.dialogsData[action.id].messagesData, {
                    id: state.dialogsData[action.id].messagesData.length + 1,
                    message: state.dialogsData[action.id].owners[action.currentUserId].newMessageText, //state.dialogsPage.newMessageText
                    photoUrl: action.photoUrl,
                    userUid: action.userUid
                }]
                newState.dialogsData[action.id].owners[action.currentUserId].newMessageText = ''
                return newState
            }
            return state
        case UPDATE_MESSAGE_TEXT:
            let newState = {
                ...state,
            }
            newState.dialogsData[action.id].owners[action.currentUserId].newMessageText = action.newText
            return newState
        case SET_DIALOGS_DATA:
            return {
                ...state,
                dialogsData: [...action.dialogsData]
            }
        default:
            return state
    }
}

// ***Action Creators
export const addMessage = (photo, id, currentUserId, userUid) => ({type: ADD_MESSAGE, photoUrl: photo, id, currentUserId, userUid})
export const updateMessageText = (text, id, currentUserId) => ({
    type: UPDATE_MESSAGE_TEXT,
    newText: text,
    id, currentUserId
})
export const setDialogsData = (dialogsData) => ({type: SET_DIALOGS_DATA, dialogsData})

// ***Redux Thunks

export const getDialogsData = (currentUserUid) => (dispatch) => {
    dialogsAPI.getDialogs().then(data => {
        let dialogsData = []
        data.docs.map(doc => {
            if (doc.data().ownersUids.indexOf(currentUserUid) !== -1) {
                dialogsData = [...dialogsData, {...doc.data(), id: dialogsData.length}]
            }
        })
        dispatch(setDialogsData(dialogsData))
    })
}

export const updateDialogsData = (dialog) => (dispatch) =>{
    dialogsAPI.setDialogs(dialog)
}


export const createDialogAndRedirect = (currentUser, user, dialogsData, uid) => (dispatch) => {
    let flag = false
    dialogsData.forEach(item => {
        item.owners.forEach(owner => {
            if(owner.name === currentUser.name) flag = true
        })
    })
    if(!flag){
        let newObj = {
            owners: [{
                name: currentUser.name,
                photoURL: currentUser.photoURL,
                uid: currentUser.uid,
                newMessageText: ''
            }, {
                name: user.name,
                photoURL: user.photoURL,
                uid: user.uid,
                newMessageText: ''
            }],
            ownersUids: [
                currentUser.uid,
                user.uid
            ],
            messagesData: [],
            uid
        }
        firebase.firestore().collection('dialogs')
            .doc(uid)
            .set(newObj)
        dispatch(setDialogsData([...dialogsData, newObj]))
    }
}

