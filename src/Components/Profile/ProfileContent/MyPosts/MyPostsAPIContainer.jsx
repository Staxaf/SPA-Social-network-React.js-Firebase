import React from 'react'
import firebase from "../../../../firebase";
import MyPosts from "./MyPosts";
import {usersAPI} from "../../../../redux/api";

class MyPostsAPIContainer extends React.Component {

    componentDidMount = () => {
        this.props.setUser(this.props.currentUser.name, this.props.currentUser.photoURL, this.props.currentUser.uid)
        console.log('uid: ', this.props.uid)
        this.props.setIsFetching(true)
        firebase.firestore().collection('postsData')
            .where('userUid', '==', this.props.uid)
            .get()
            .then(response => {//
                let postsData = response.docs.map(doc => ({...doc.data()}))
                postsData.sort((a, b) => {// фильтрую посты по возрастанию id
                    if (a.id > b.id) return 1
                    else if (a.id < b.id) return -1
                    else return 0
                })
                this.props.setPosts(postsData)// достаю из базы все посты
                this.props.setIsFetching(false)
            }).catch(error => {
            this.props.setIsFetching(false)
            console.log('Ошибка', error)
        })
    }
    render = () => {
        return <MyPosts {...this.props} />
    }
}


export default MyPostsAPIContainer;