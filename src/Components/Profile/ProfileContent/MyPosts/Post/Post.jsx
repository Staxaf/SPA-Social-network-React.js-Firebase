import React from 'react'
import css from './Post.module.css'
import Comment from "./Comment/Comment";
import {NavLink} from "react-router-dom";

const Post = (props) => {
    let comments = null
    if (props.post.comments !== null && props.post.comments !== undefined) {// convert comments into jsx
        comments = props.post.comments.map(comment => {
            return <Comment getUserPosts={props.getUserPosts}
                            getUsersFollowsAndFollowers={props.getUsersFollowsAndFollowers} user={props.user}
                            name={comment.name} userUid={comment.whoseCommentUid} image={comment.image} dateOfPublishing={comment.dateOfPublishing}
                            text={comment.text}/>
        })
    }

    let addComment = () => {
        props.addComment(props.postsData, props.post.id, props.currentUser.photoURL, props.currentUser.name, props.currentUser.uid)
    }

    let onCommentChange = (e) => {
        props.updateCommentText(e.target.value, props.post.id)
    }
    return (
        <div className={css.post}>
            <div className={css.post__img}>
                <NavLink onClick={() => {// when user click on other user link then loading data of this user
                    props.getUserPosts(props.post.whosePostUserUid)
                    props.getUsersFollowsAndFollowers(props.user, props.post.whosePostUserUid)
                }} to={props.post.whosePostUserUid === props.user.uid ? '/profile/myPosts' : `/profile/${props.post.whosePostUserUid}/myPosts`}>
                    <img src={props.post.postImage} alt=""/>
                </NavLink>
            </div>
            <div className={css.post__content}>
                <div className={css.post__title}>
                    <div className={css.title__name}>
                        <NavLink onClick={() => {
                            props.getUserPosts(props.post.whosePostUserUid)
                            props.getUsersFollowsAndFollowers(props.user, props.post.whosePostUserUid)
                        }} to={props.post.whosePostUserUid === props.user.uid ? '/profile/myPosts' : `/profile/${props.post.whosePostUserUid}/myPosts`}>
                            {props.post.postName}
                        </NavLink>
                    </div>
                    <div className={css.icons}>
                        <button onClick={() => {
                            props.addLike(props.postsData, props.post.id, props.post.uid, props.currentUser.uid)
                        }}><i className="fas fa-thumbs-up"/>{props.post.whoIsLikeList.length}</button>
                        <button onClick={() => {
                            props.addDislike(props.postsData, props.post.id, props.post.uid, props.currentUser.uid)
                        }}><i className="fas fa-thumbs-down"/>{props.post.whoIsDislikeList.length}</button>
                        {/*<button><i className="fas fa-eye"/>{props.post.viewCounts}</button>*/}
                    </div>
                </div>
                <div className={css.post__date}>
                    <p>Published at {props.post.dateOfPublishing}</p>
                </div>
                <div className={css.post__text}>
                    {props.post.message}
                </div>
                <div className={css.post__comment}>
                    {comments}
                </div>
                <div className={css.post__addComment}>
                    <img src={props.currentUser.photoURL} alt=""/>
                    <textarea onChange={onCommentChange} value={props.post.newCommentText}
                              placeholder="Post a comment"/>
                    <button onClick={addComment} className={css.post__send}>
                        <i className="fab fa-telegram-plane"/>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Post;