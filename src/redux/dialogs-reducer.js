import firebase from './../firebase'
import { dialogsAPI, usersAPI } from "./api";
import { getStringDate } from "./profile-reducer";

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT'
const SET_DIALOGS_DATA = 'SET_DIALOGS_DATA'

const SET_IS_CHANGING = 'SET_IS_CHANGING'
const CHANGE_MESSAGE = 'CHANGE_MESSAGE'
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
                    userUid: action.userUid,
                    date: getStringDate(),
                    userName: action.name
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
        case SET_DIALOGS_DATA: {
            let newState = {
                ...state,
                dialogsData: [...action.dialogsData]
            }
            newState.dialogsData = newState.dialogsData.map(item => ({ ...item }))
            return newState
        }
        case SET_IS_CHANGING:
            return {
                ...state,
                isChanging: action.isChanging
            }
        case CHANGE_MESSAGE:
            let stateCopy = {
                ...state,
                dialogsData: [...state.dialogsData]
            }
            stateCopy.dialogsData[action.id].owners[action.currentUserId].newMessageText = action.messageText
            stateCopy.dialogsData[action.id].isChanging = true
            stateCopy.dialogsData[action.id].changingMessageId = action.messageId
            return stateCopy
        default:
            return state
    }
}

// ***Action Creators
export const addMessage = (photo, id, currentUserId, userUid, name) => ({
    type: ADD_MESSAGE,
    photoUrl: photo,
    id,
    currentUserId,
    userUid,
    name
})
export const updateMessageText = (text, id, currentUserId) => ({
    type: UPDATE_MESSAGE_TEXT,
    newText: text,
    id, currentUserId
})
export const setDialogsData = (dialogsData) => ({ type: SET_DIALOGS_DATA, dialogsData })
export const setIsChanging = (isChanging) => ({ type: SET_IS_CHANGING, isChanging })
export const changeMessage = (id, messageText, currentUserId, messageId) => ({
    type: CHANGE_MESSAGE,
    id,
    messageText,
    currentUserId,
    messageId
})

// ***Redux Thunks

export const getDialogsData = (currentUserUid) => (dispatch) => {
    // Realtime subscribe on changes database
    firebase.firestore().collection('dialogs').onSnapshot(snapshot => {
        let dialogsData = []
        snapshot.forEach(doc => {
            if (doc.data().ownersUids.indexOf(currentUserUid) !== -1) {
                dialogsData = [...dialogsData, { 
                    ...doc.data(), 
                    id: dialogsData.length, 
                    isChanging: false, changingMessageId: -1 }]
            }
        })
        dispatch(setDialogsData(dialogsData))
    })
    /*dialogsAPI.getDialogs().then(data => {
        let dialogsData = []
        data.docs.map(doc => {
            if (doc.data().ownersUids.indexOf(currentUserUid) !== -1) {
                dialogsData = [...dialogsData, {
                    ...doc.data(),
                    id: dialogsData.length,
                    isChanging: false,// изменяется ли какое-то сообщение
                    changingMessageId: -1//id изменяемого сообщения
                }]
            }
        })
        dispatch(setDialogsData(dialogsData))
    })*/
}

export const updateDialogsData = (dialog) => (dispatch) => {
    dialogsAPI.setDialogs(dialog)
}


export const createDialogAndRedirect = (currentUser, user, dialogsData, uid) => (dispatch) => {
    let flag = false
    dialogsData.forEach(item => {
        item.owners.forEach(owner => {
            if (owner.name === currentUser.name) flag = true
        })
    })
    if (!flag) {
        let newObj = {
            owners: [{
                name: currentUser.name,
                photoURL: currentUser.photoURL,
                uid: currentUser.uid,
                state: currentUser.state,
                newMessageText: ''
            }, {
                name: user.name,
                photoURL: user.photoURL,
                uid: user.uid,
                state: currentUser.state,
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

export const confirmChangeMessage = (dialogsData, dialogId, messageId, currentUserId, dialogUid) => (dispatch) => {
    dialogsData[dialogId].messagesData = [...dialogsData[dialogId].messagesData]
    dialogsData[dialogId].messagesData[messageId - 1].message = dialogsData[dialogId].owners[currentUserId].newMessageText
    dialogsData[dialogId].isChanging = false
    dialogsData[dialogId].changingMessageId = - 1
    dialogsData[dialogId].owners[currentUserId].newMessageText = ''
    firebase.firestore().collection('dialogs').doc(dialogUid).set(dialogsData[dialogId])
    dispatch(setDialogsData(dialogsData))
}

