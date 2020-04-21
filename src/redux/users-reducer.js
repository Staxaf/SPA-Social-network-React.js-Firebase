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
            }

            db.collection('usersData').doc(action.uid).set({
                ...stateCopy.usersData[action.userId - 1],
                isFollow: !stateCopy.usersData[action.userId - 1].isFollow// изменяю в базе данных поле isFollow
            })
            stateCopy.usersData[action.userId - 1].isFollow = !stateCopy.usersData[action.userId - 1].isFollow
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
