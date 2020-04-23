import React from 'react'
import css from './MyPosts.module.css'
import Post from './Post/Post'
import firebase from "../../../firebase";
import Loader from "react-loader-spinner";


class MyPosts extends React.Component {

    componentDidMount = () => {
        //this.props.setUser(this.props.name, this.props.photoURL)
        console.log('uid: ', this.props.uid)
        this.props.setIsFetching(true)
        const db = firebase.firestore()
        // console.log(this.props.uid)
        //if(this.props.uid !== undefined){
            db.collection('postsData')//.orderBy('id', 'asc')
                .where('userUid', '==', this.props.uid)
                .get()
                .then(response => {//
                    let postsData = response.docs.map(doc => ({...doc.data()}))
                    this.props.setIsFetching(false)
                    this.props.setPosts(postsData)// достаю из базы все посты и сортирую по возрастанию id(чтобы самым первым высвечивался новый пост)
                    console.log(this.props.user)
                }).catch(error => {
                this.props.setIsFetching(false)
                console.log('Ошибка', error)
            })
            console.log(this.props.user)
        //}
    }
    render = () => {
        console.log(this.props.user)
        return <div>
            <div className={css.input}>
                <img
                    src={this.props.photoURL}
                    alt=""/>
                <textarea onChange={(e) => {
                    this.props.onPostChange(e.target.value)
                }} className={css.text__area}
                          value={this.props.newPostText} cols='70' rows='7'/>
                <div className={css.icons}>
                    <a><i className="fas fa-paperclip"/></a>
                    <a><i className="far fa-laugh"/></a>
                </div>
                <button onClick={() => {
                    this.props.addPost(this.props.uid)
                }} className={css.btn}>Publish
                </button>
            </div>
            <div className={css.posts}>
                {this.props.isFetching
                    ? <div className="text-center">
                        <Loader type="Oval" color="#00BFFF" height={40} width={40}/>
                    </div> : this.props.postsData !== undefined ? this.props.postsData.map(post => (
                        <Post name={this.props.name} photoURL={this.props.photoURL} message={post.message}
                              likeCounts={post.likeCounts} dislikeCounts={post.dislikeCounts}
                              viewCounts={post.viewCounts} comments={post.comments} id={post.id}
                              dateOfPublishing={post.dateOfPublishing} uid={post.uid}
                              newCommentText={post.newCommentText} updateCommentText={this.props.onCommentChange}
                              addComment={this.props.addComment} addLike={this.props.addLike}
                              addDislike={this.props.addDislike}/>
                    )) : ''}

            </div>
        </div>
    }
}

/*const MyPosts = (props) => {
    //this.props.setUser(this.props.name, this.props.photoURL)
    console.log('uid: ', props.uid)
    props.setIsFetching(true)
    const db = firebase.firestore()
    // console.log(this.props.uid)
    if(props.uid !== undefined){
    db.collection('postsData').orderBy('id', 'asc')
        //.where('uid', '==', this.props.uid)
        .get()
        .then(response => {//
            let postsData = response.docs.map(doc => ({...doc.data()}))
            props.setIsFetching(false)
            props.setPosts(postsData)// достаю из базы все посты и сортирую по возрастанию id(чтобы самым первым высвечивался новый пост)
            console.log(props.user)
        }).catch(error => {
        this.props.setIsFetching(false)
        console.log('Ошибка', error)
    })
    console.log(props.user)
    }

    return <div>
        <div className={css.input}>
            <img
                src={props.photoURL}
                alt=""/>
            <textarea onChange={(e) => {
                props.onPostChange(e.target.value)
            }} className={css.text__area}
                      value={props.newPostText} cols='70' rows='7'/>
            <div className={css.icons}>
                <a><i className="fas fa-paperclip"/></a>
                <a><i className="far fa-laugh"/></a>
            </div>
            <button onClick={() => {
                props.addPost(props.uid)
            }} className={css.btn}>Publish
            </button>
        </div>
        <div className={css.posts}>
            {props.isFetching
                ? <div className="text-center">
                    <Loader type="Oval" color="#00BFFF" height={40} width={40}/>
                </div> : props.postsData !== undefined ? props.postsData.map(post => (
                    <Post name={props.name} photoURL={props.photoURL} message={post.message}
                          likeCounts={post.likeCounts} dislikeCounts={post.dislikeCounts}
                          viewCounts={post.viewCounts} comments={post.comments} id={post.id}
                          dateOfPublishing={post.dateOfPublishing} uid={post.uid}
                          newCommentText={post.newCommentText} updateCommentText={props.onCommentChange}
                          addComment={props.addComment} addLike={props.addLike}
                          addDislike={props.addDislike}/>
                )) : ''}

        </div>
    </div>
}*/

export default MyPosts;