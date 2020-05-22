import React from 'react'
import css from './MyPosts.module.css'
import Post from './Post/Post'
import Loader from "react-loader-spinner";
import {Field, reduxForm} from "redux-form";

let MyPostsForm = props => {
    return <form onSubmit={props.handleSubmit} className={css.input}>
        <div className={css.input__item}>
            <img
                src={props.currentUser.photoURL}
                alt=""/>
                <Field component="textarea" name="newPostText" className={css.textarea} />
        </div>
        <div className={css.input__item}>
            <div className={css.icons}>
                <button><i className="fas fa-paperclip"/></button>
                <button><i className="far fa-laugh"/></button>
            </div>
            <button className={css.btn}>Publish</button>
             {/*   onClick={() => {*/}
             {/*    props.addPostThunk(props.newPostText, props.postsData, props.currentUser.photoURL,*/}
             {/*        props.currentUser.name, props.user.uid, props.currentUser.uid)*/}
             {/*}} */}

        </div>
    </form>
}

MyPostsForm = reduxForm({
    form: 'addPost'
})(MyPostsForm)

const MyPosts = props => {

    let onSubmit = values => {
        console.log(values)
        props.addPostThunk(values.newPostText, props.postsData, props.currentUser.photoURL, props.currentUser.name, props.user.uid, props.currentUser.uid)
    }

    return <div>
        <div className={css.posts}>
            <MyPostsForm onSubmit={onSubmit} currentUser={props.currentUser} />
            {props.isFetching
                ? <div className="text-center">
                    <Loader type="Oval" color="#00BFFF" height={40} width={40}/>
                </div> : props.postsData !== undefined ? props.postsData.map(post => (
                    <Post post={post} user={props.user} postsData={props.postsData}
                          currentUser={props.currentUser} updateCommentText={props.onCommentChange}
                          addComment={props.addCommentThunk} addLike={props.toggleLikeThunk}
                          addDislike={props.toggleDislikeThunk} getUserPosts={props.getUserPosts}
                          getUsersFollowsAndFollowers={props.getUsersFollowsAndFollowers}/>
                )) : ''}

        </div>
    </div>
}


export default MyPosts;