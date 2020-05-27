import firebase from './../firebase'
import {dialogsAPI} from "./api";
import {getStringDate} from "./profile-reducer";

const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT'
const SET_DIALOGS_DATA = 'SET_DIALOGS_DATA'
const NOTIFICATION_SOUND = 'https://firebasestorage.googleapis.com/v0/b/social-network-react-redux.appspot.com/o/sounds%2Fintuition.mp3?alt=media&token=1be5e98d-51bc-43be-ba0b-e3813cde620f'

const CHANGE_MESSAGE = 'CHANGE_MESSAGE'
let initialState = {
    dialogsData: [],

}

export const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_MESSAGE_TEXT:
            let newState = {
                ...state,
            }
            newState.dialogsData[action.id].owners[action.currentUserId].newMessageText = action.newText
            return newState
        case SET_DIALOGS_DATA: {
            return {
                ...state,
                dialogsData: [...action.dialogsData.sort((a, b) => a.lastChanges < b.lastChanges ? 1 : -1 ).map((item, index) => ({
                    ...item,
                    id: index
                }))]
            }
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

export const updateMessageText = (text, id, currentUserId) => ({
    type: UPDATE_MESSAGE_TEXT,
    newText: text,
    id, currentUserId
})
export const setDialogsData = (dialogsData) => ({type: SET_DIALOGS_DATA, dialogsData})
export const changeMessage = (id, messageText, currentUserId, messageId) => ({
    type: CHANGE_MESSAGE,
    id,
    messageText,
    currentUserId,
    messageId
})

// ***Redux Thunks
export const addMessageThunk = (dialogsData, photoUrl, id, currentUserId, userUid, name) => (dispatch) => {
    if (dialogsData[id].owners[currentUserId].newMessageText.length > 0) {
        dialogsData[id].messagesData = [...dialogsData[id].messagesData, {
            id: dialogsData[id].messagesData.length,
            message: dialogsData[id].owners[currentUserId].newMessageText, //state.dialogsPage.newMessageText
            photoUrl: photoUrl,
            userUid: userUid,
            date: getStringDate(),
            userName: name,
        }]
        new Audio(NOTIFICATION_SOUND).play()
        dialogsData[id].owners[currentUserId].newMessageText = ''
        dialogsData[id].owners[currentUserId].unreadMessages++
        dialogsData[id].lastChanges = new Date().getTime()
        firebase.firestore().collection('dialogs').doc(dialogsData[id].uid).set({
            ...dialogsData[id]
        })
    }
}
export const getDialogsData = (currentUserUid) => (dispatch) => {
    // Realtime subscribe on changes database
    firebase.firestore().collection('dialogs').onSnapshot(snapshot => {
        let dialogsData = []
        snapshot.forEach(doc => {
            if (doc.data().ownersUids.indexOf(currentUserUid) !== -1) {
                dialogsData = [...dialogsData, {
                    ...doc.data(),
                    id: dialogsData.length,
                    isChanging: false, changingMessageId: -1
                }]
            }
        })
        dispatch(setDialogsData(dialogsData))
    })
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
                newMessageText: '',
                unreadMessages: 0
            }, {
                name: user.name,
                photoURL: user.photoURL,
                uid: user.uid,
                newMessageText: '',
                unreadMessages: 0
            }],
            ownersUids: [
                currentUser.uid,
                user.uid
            ],
            messagesData: [],
            uid,
            lastChanges: new Date().getTime()
        }
        firebase.firestore().collection('dialogs')
            .doc(uid)
            .set(newObj)
        dispatch(setDialogsData([...dialogsData, newObj]))
    }
}

export const confirmChangeMessage = (dialogsData, dialogId, messageId, currentUserId, dialogUid) => (dispatch) => {
    dialogsData[dialogId].messagesData = [...dialogsData[dialogId].messagesData]
    dialogsData[dialogId].messagesData[messageId].message = dialogsData[dialogId].owners[currentUserId].newMessageText
    dialogsData[dialogId].isChanging = false
    dialogsData[dialogId].changingMessageId = -1
    dialogsData[dialogId].owners[currentUserId].newMessageText = ''
    firebase.firestore().collection('dialogs').doc(dialogUid).set(dialogsData[dialogId])
    dispatch(setDialogsData(dialogsData))
}

export const deleteMessageThunk = (dialogUid, dialogId, messageId, dialogsData) => (dispatch) => {
    let newMessageData = dialogsData[dialogId].messagesData
    newMessageData.splice(messageId, 1)
    newMessageData = newMessageData.map((item, id) => ({
        ...item, id
    }))
    firebase.firestore().collection('dialogs').doc(dialogUid).set({
        messagesData: newMessageData
    }, {merge: true})
}

export const resetUnreadMessages = (dialogUid, owners, userDialogId) => (dispatch) => {
    owners[userDialogId].unreadMessages = 0
    firebase.firestore().collection('dialogs').doc(dialogUid).set({
        owners
    }, {merge: true})
}
