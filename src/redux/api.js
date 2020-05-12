import firebase from "../firebase";


export const usersAPI = {
    getUsers() {
        return firebase.firestore().collection('users').get()
    },
    getUser(uid) {
        return firebase.firestore().collection('users')
            .doc(uid).get()
    },
    getPostsOfUser(uid) {
        return firebase.firestore().collection('postsData')
            .where('userUid', '==', uid)
            .get()
    },
    setUser(uid, newData){
        return firebase.firestore().collection('users').doc(uid).set({// добавляю uid юзера, на которого подписались или убираю, если отписался
            ...newData
        }, {merge: true})
    }
}

export const dialogsAPI = {
    getDialogs() {
        return firebase.firestore().collection('dialogs').get()
    },
    setDialogs(dialog) {
        return firebase.firestore().collection('dialogs').doc(dialog.uid).set(dialog)
    }
}