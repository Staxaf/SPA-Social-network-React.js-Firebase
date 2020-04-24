import firebase from './../firebase'

const FOLLOW_UNFOLLOW = 'FOLLOW-UNFOLLOW'
const SET_USERS = 'SET-USERS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
    usersData: [],
    isFetching: false
}

export const usersReducer = (state = initialState, action) => {
    const db = firebase.firestore()
    switch (action.type) {
        case FOLLOW_UNFOLLOW:
            let stateCopy = {
                ...state,
                usersData: [...state.usersData]
            } //JSON.parse(JSON.stringify(state))// глубокое копирование - не верьте!!! Я полдня искал ошибку, оказалось из-за этого "глубокого копирования" не обновлялся компонент
            let follows = ''
            db.collection('users').doc(action.currentUser.uid).get().then(u => {// получить текущего юзера, чтобы получить его фоловеров
                follows = u.data().follows
                if (follows.indexOf(action.userUid) === -1) {
                    //stateCopy.usersData[action.userId].isFollow = true
                    db.collection('users').doc(action.uid).set({// добавляю uid юзера, на которого подписались или убираю, если отписался
                        ...action.currentUser,
                        follows: [...follows, action.userUid]
                    }).then(() => {
                        db.collection('users').doc(action.userUid).set({
                            ...stateCopy.usersData[action.userId],
                            followers: [...stateCopy.usersData[action.userId].followers, action.uid]// добавляю в массив followers пользователю, на которого подписались
                        })
                    })
                } else {
                    //stateCopy.usersData[action.userId].isFollow = false
                    follows.splice(follows.indexOf(action.userUid), 1)
                    db.collection('users').doc(action.uid).set({// добавляю uid юзера, на которого подписались или убираю, если отписался
                        ...action.currentUser,
                        follows: [...follows]
                    }).then(() => {
                        db.collection('users').doc(action.userUid).set({
                            ...stateCopy.usersData[action.userId],
                            followers: [...stateCopy.usersData[action.userId].followers]// добавляю в массив followers пользователю, на которого подписались
                        })
                    })

                }
            })
            console.log('id: ', action.userId, 'users: ', stateCopy.usersData, 'follow: ', stateCopy.usersData[action.userId].isFollow)
            stateCopy.usersData[action.userId].isFollow = !stateCopy.usersData[action.userId].isFollow
            return stateCopy
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
        default:
            return state
    }
}
