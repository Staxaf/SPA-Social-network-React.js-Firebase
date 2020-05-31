import firebase from './../firebase'
import {dialogsAPI} from "./api";
import {getStringDate, setIsPostPhotoUploading, setUploadedPostPhoto} from "./profile-reducer";

const SET_DIALOGS_DATA = 'SET_DIALOGS_DATA'
const SET_UPLOADED_MESSAGE_PHOTO = 'SET_UPLOADED_MESSAGE_PHOTO'
const NOTIFICATION_SOUND = 'https://firebasestorage.googleapis.com/v0/b/social-network-react-redux.appspot.com/o/sounds%2Fintuition.mp3?alt=media&token=1be5e98d-51bc-43be-ba0b-e3813cde620f'

const CHANGE_MESSAGE = 'CHANGE_MESSAGE'
let initialState = {
    dialogsData: [],
    uploadedMessagePhoto: ''
}

export const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DIALOGS_DATA: {
            return {
                ...state,
                dialogsData: [...action.dialogsData.sort((a, b) => a.lastChanges < b.lastChanges ? 1 : -1).map((item, index) => ({
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
            stateCopy.dialogsData[action.id].changingMessageId = action.messageId
            return stateCopy
        case SET_UPLOADED_MESSAGE_PHOTO:
            return {
                ...state,
                uploadedMessagePhoto: action.uploadedMessagePhoto
            }
        default:
            return state
    }
}

// ***Action Creators

export const setDialogsData = (dialogsData) => ({type: SET_DIALOGS_DATA, dialogsData})
export const changeMessage = (id, messageText, currentUserId, messageId) => ({
    type: CHANGE_MESSAGE,
    id,
    messageText,
    currentUserId,
    messageId
})
export const setUploadedMessagePhoto = (uploadedMessagePhoto) => ({
    type: SET_UPLOADED_MESSAGE_PHOTO,
    uploadedMessagePhoto
})
// ***Redux Thunks
export const addMessageThunk = (dialogsData, photoUrl, id, currentUserId, userUid, name, newMessageText, uploadedMessagePhoto) => (dispatch) => {
    if (newMessageText && newMessageText.length > 0) {
        dialogsData[id].messagesData = [...dialogsData[id].messagesData, {
            id: dialogsData[id].messagesData.length,
            message: newMessageText,
            photoUrl: photoUrl,
            userUid: userUid,
            date: getStringDate(),
            userName: name,
            uploadedMessagePhoto: uploadedMessagePhoto
        }]
        new Audio(NOTIFICATION_SOUND).play()
        dialogsData[id].owners[currentUserId].unreadMessages++
        dialogsData[id].lastChanges = new Date().getTime()
        dispatch(setUploadedMessagePhoto(''))
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
                    id: dialogsData.length, changingMessageId: -1
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
                unreadMessages: 0
            }, {
                name: user.name,
                photoURL: user.photoURL,
                uid: user.uid,
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

export const confirmChangeMessage = (dialogsData, dialogId, messageId, currentUserId, dialogUid, newMessageText) => (dispatch) => {
    dialogsData[dialogId].messagesData = [...dialogsData[dialogId].messagesData]
    dialogsData[dialogId].messagesData[messageId].message = newMessageText
    dialogsData[dialogId].changingMessageId = -1
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

export const uploadMessagePhoto = (user, file) => (dispatch) => {
    dispatch(setUploadedMessagePhoto(''))
    firebase.storage().ref(`images/${user.uid}/${file.name}`).put(file).on('state_changed',
        (snapshot) => {
        },
        (error) => {
            console.log(error)
        },
        () => {
            firebase.storage().ref(`images/${user.uid}`).child(file.name).getDownloadURL().then(url => {
                dispatch(setUploadedMessagePhoto(url))
            })
        })
}
