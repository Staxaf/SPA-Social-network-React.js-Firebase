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

let initialState = {
    postsData: [],// all posts
    name: "Anton Mazurenko",// user name
    folowers: 130,// folowers count
    profileImage: 'data:image/jpeg;base64,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',
    newPostText: '',// text in adding post textarea
    isFetching: false// for loader
}

export const profileReducer = (state = initialState, action) => {
    const db = firebase.firestore()
    switch(action.type){
        case ADD_POST:
            if (state.newPostText.length > 0 && state.postsData !== undefined) {
                state.postsData.forEach(item => {
                    db.collection('postsData').doc(item.uid).set({
                        ...item,
                        id: item.id + 1
                    })
                })// все id в базе увеличиваю на 1, чтобы вставить новый пост на первое место

                let newPost = {
                    id: 1,
                    message: state.newPostText,
                    likeCounts: 0,
                    dislikeCounts: 0,
                    viewCounts: 0,
                    dateOfPublishing: getStringDate(),
                    comments: [],
                    uid: `id${state.postsData.length}`
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
        case ADD_COMMENT:{
            let stateCopy
            if (state.postsData[action.idComment - 1].newCommentText.length > 0) {
                stateCopy = {
                    ...state,
                    postsData: [...state.postsData]
                };
                let newComment = {
                    image: state.profileImage,
                    name: state.name,
                    dateOfPublishing: getStringDate(),
                    text: stateCopy.postsData[action.idComment - 1].newCommentText //state.profilePage.postsData.newCommentText
                }
                stateCopy.postsData[action.idComment - 1].newCommentText = ''
                db.collection('postsData').doc(stateCopy.postsData[action.idComment - 1].uid).set({
                    ...stateCopy.postsData[action.idComment - 1],
                    comments: [...stateCopy.postsData[action.idComment - 1].comments, newComment]
                })// добавляю в базу комментарий
                stateCopy.postsData[action.idComment - 1].comments = [...stateCopy.postsData[action.idComment - 1].comments, newComment]
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
        default:
            return state
    }
}
