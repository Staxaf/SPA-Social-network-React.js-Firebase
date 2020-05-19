import React from 'react'
import css from './MyPosts.module.css'
import Post from './Post/Post'
import Loader from "react-loader-spinner";


const MyPosts = props => {
    return <div>
        <div className={css.input}>
            <div className={css.input__item}>
                <img
                    src={props.currentUser.photoURL}
                    alt=""/>
                <textarea onChange={(e) => {
                    props.onPostChange(e.target.value)
                }} className={css.textarea}
                          value={props.newPostText}/>
            </div>
            <div className={css.input__item}>
                <div className={css.icons}>
                    <button><i className="fas fa-paperclip"/></button>
                    <button><i className="far fa-laugh"/></button>
                </div>
                <button onClick={() => {
                    props.addPostThunk(props.newPostText, props.postsData, props.currentUser.photoURL,
                        props.currentUser.name, props.user.uid, props.currentUser.uid)
                }} className={css.btn}>Publish
                </button>
            </div>
        </div>
        <div className={css.posts}>
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