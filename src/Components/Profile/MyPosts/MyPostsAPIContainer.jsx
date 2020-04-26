import React from 'react'
import firebase from "../../../firebase";
import MyPosts from "./MyPosts";

class MyPostsAPIContainer extends React.Component {

    componentDidMount = () => {
        console.log('uid: ', this.props.uid)
        this.props.setIsFetching(true)
        const db = firebase.firestore()
        db.collection('postsData')
            .where('userUid', '==', this.props.uid)
            .get()
            .then(response => {//
                let postsData = response.docs.map(doc => ({...doc.data()}))
                postsData.sort((a, b) => {// фильтрую посты по возрастанию id
                    if (a.id > b.id) return 1
                    else if (a.id < b.id) return -1
                    else return 0
                })
                this.props.setIsFetching(false)
                this.props.setPosts(postsData)// достаю из базы все посты
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