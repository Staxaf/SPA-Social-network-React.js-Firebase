import React from 'react'
import css from './Post.module.css'
import Comment from "./Comment/Comment";
import {NavLink} from "react-router-dom";

const Post = (props) => {
    debugger
    let comments = null
    if (props.comments !== null && props.comments !== undefined) {
        comments = props.comments.map(comment => {
            return <Comment name={comment.name} image={comment.image} dateOfPublishing={comment.dateOfPublishing}
                            text={comment.text}/>
        })
    }

    let addComment = () => {
        //props.dispatch({type: 'ADD-COMMENT', idComment: props.id})
        props.addComment(props.postsData, props.id, props.currentUser.photoURL, props.currentUser.name)
    }

    let onCommentChange = (e) => {
        //props.dispatch({type: 'UPDATE-COMMENT-TEXT', idComment: props.id, newText: e.target.value})
        props.updateCommentText(e.target.value, props.id)
    }
    return (
        <div className={css.post}>
            <div className={css.post__img}>
                <img src={props.photoURL} alt=""/>
            </div>
            <div className={css.post__content}>
                <div className={css.post__title}>
                    <div className={css.title__name}>
                        <NavLink to={`/profile/${props.userUid}/myPosts`}>{props.name}</NavLink>
                    </div>
                    <div className={css.icons}>
                        <button onClick={() => {
                            props.addLike(props.postsData ,props.id, props.uid,  props.currentUser.uid)
                        }}><i className="fas fa-thumbs-up"/>{props.whoIsLikeList.length}</button>
                        <button onClick={() => {
                            props.addDislike(props.postsData ,props.id, props.uid,  props.currentUser.uid)
                        }}><i className="fas fa-thumbs-down"/>{props.whoIsDislikeList.length}</button>
                        <button><i className="fas fa-eye"/>{props.viewCounts}</button>
                    </div>
                </div>
                <div className={css.post__date}>
                    <p>Published at {props.dateOfPublishing}</p>
                </div>
                <div className={css.post__text}>
                    {props.message}
                </div>
                <div className={css.post__comment}>
                    {comments}
                </div>
                <div className={css.post__addComment}>
                    <img src={props.currentUser.photoURL} alt=""/>
                    <textarea onChange={onCommentChange} value={props.newCommentText} cols="30" rows="10"
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