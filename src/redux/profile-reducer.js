import firebase from "../firebase";

const getStringMonth = (index) => {
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
        'september', 'october', 'november', 'december']
    return months[index]
}
export let getStringDate = () => `${new Date().getHours()}:${new Date().getMinutes()} ${new Date()
    .getDate()} ${getStringMonth(new Date().getMonth())}  ${new Date().getFullYear()}`


const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const ADD_COMMENT = 'ADD-COMMENT'
const UPDATE_COMMENT_TEXT = 'UPDATE-COMMENT-TEXT'

const SET_POSTS_FROM_DB = 'SET_POSTS_FROM_DB'
const SET_IS_FETCHING = 'SET_IS_FETCHING'

const TOGGLE_LIKE = 'TOGGLE_LIKE'
const TOGGLE_DISLIKE = 'TOGGLE_DISLIKE'

const SET_USER = 'SET_USER'

let initialState = {
    postsData: [],// all posts
    name: '',// user name
    folowers: 130,// folowers count
    profileImage: '',
    newPostText: '',// text in adding post textarea
    isFetching: false// for loader
}

export const profileReducer = (state = initialState, action) => {
    const db = firebase.firestore()
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                name: action.name,
                profileImage: action.photoURL
            }
        case ADD_POST:
            if (state.newPostText.length > 0 && state.postsData !== undefined) {
                state.postsData.forEach(item => {
                    db.collection('postsData').doc(item.uid).set({
                        ...item,
                        id: item.id++
                    })
                })// все id в базе увеличиваю на 1, чтобы вставить новый пост на первое место

                let newPost = {
                    id: 1,
                    message: state.newPostText,
                    likeCounts: 0,
                    isLiked: false,
                    dislikeCounts: 0,
                    isDisliked: false,
                    viewCounts: 0,
                    dateOfPublishing: getStringDate(),
                    comments: [],
                    uid: `id${state.postsData.length}`,
                    userUid: action.userUid
                }
                db.collection('postsData').doc(newPost.uid).set(newPost)// добавляю в базу запись с новым постом, которая имеет кастомный айди
                return {
                    ...state,
                    postsData: [newPost, ...state.postsData],
                    newPostText: ''
                }
            }
            return state
        case UPDATE_NEW_POST_TEXT:

            return {
                ...state,
                newPostText: action.newText
            }
        case ADD_COMMENT: {
            let stateCopy
            if (state.postsData[action.idComment - 1].newCommentText.length > 0) {
                stateCopy = {
                    ...state,
                    postsData: [...state.postsData]
                };
                let newComment = {
                    image: action.photoURL,
                    name: action.name,
                    dateOfPublishing: getStringDate(),
                    text: stateCopy.postsData[action.idComment - 1].newCommentText //state.profilePage.postsData.newCommentText
                }
                stateCopy.postsData[action.idComment - 1].newCommentText = ''
                stateCopy.postsData[action.idComment - 1].comments = [...stateCopy.postsData[action.idComment - 1].comments, newComment]
                db.collection('postsData').doc(stateCopy.postsData[action.idComment - 1].uid).set({
                    ...stateCopy.postsData[action.idComment - 1],
                })// добавляю в базу комментарий

                return stateCopy
            }
            return state
        }
        case UPDATE_COMMENT_TEXT:
            let stateCopy = {
                ...state,
                postsData: [...state.postsData]
            }
            stateCopy.postsData[action.idComment - 1].newCommentText = action.newText
            return stateCopy
        case SET_POSTS_FROM_DB:
            return {
                ...state,
                postsData: action.postsData
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_LIKE: {
            let newState = {
                ...state,
                postsData: [...state.postsData]
            }
            newState.postsData[action.id - 1].isLiked = !newState.postsData[action.id - 1].isLiked
            newState.postsData[action.id - 1].isLiked ? newState.postsData[action.id - 1].likeCounts++
                : newState.postsData[action.id - 1].likeCounts--
            db.collection('postsData').doc(action.uid).set({
                ...newState.postsData[action.id - 1]
            })
            return newState
        }
        case TOGGLE_DISLIKE:
            let newState = {
                ...state,
                postsData: [...state.postsData]
            }
            newState.postsData[action.id - 1].isDisliked = !newState.postsData[action.id - 1].isDisliked
            newState.postsData[action.id - 1].isDisliked ? newState.postsData[action.id - 1].dislikeCounts++
                : newState.postsData[action.id - 1].dislikeCounts--
            db.collection('postsData').doc(action.uid).set({
                ...newState.postsData[action.id - 1]
            })
            return newState
        default:
            return state
    }
}
