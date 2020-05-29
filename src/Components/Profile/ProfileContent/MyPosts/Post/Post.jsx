import React, {useEffect, useState} from 'react'
import css from './Post.module.css'
import Comment from "./Comment/Comment";
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import PopUpWindow from "../../Album/AlbumItem/PopUpWindow";

let SendCommentForm = props => {
    return <form onSubmit={props.handleSubmit} className={css.post__addComment}>
        <img src={props.currentUser.photoURL} alt=""/>
        <Field name={`newCommentText${props.id}`} component="textarea" placeholder="Post a comment"/>
        <button className={css.post__send}>
            <i className="fab fa-telegram-plane"/>
        </button>
    </form>
}

SendCommentForm = reduxForm({
    form: 'addComment'
})(SendCommentForm)

const Post = (props) => {
    const [isDisplayPostPhoto, setIsDisplayPostPhoto] = useState(false)
    const [isAllCommentsShown, setIsAllCommentsShown] = useState(false)
    const [comments, setComments] = useState([])
    const [showCommentIndex, setShowCommentIndex] = useState(5)
    const setCommentsJsx = () => {
        if(props.post.comments.length === 0) setIsAllCommentsShown(true)
        setComments(props.post.comments.map((comment, key) => {
            if (key < showCommentIndex) {
                if(props.post.comments.length === key + 1) setIsAllCommentsShown(true)
                else setIsAllCommentsShown(false)
                return <Comment key={key} getUserPosts={props.getUserPosts}
                                getUsersFollowsAndFollowers={props.getUsersFollowsAndFollowers} user={props.user}
                                name={comment.name} userUid={comment.whoseCommentUid} image={comment.image}
                                dateOfPublishing={comment.dateOfPublishing}
                                text={comment.text}/>
            }
        }))
    }
    useEffect(() => {
        setCommentsJsx()
    }, [props.post.comments])
    useEffect(() => {
        setCommentsJsx()
    }, [showCommentIndex])

    let addComment = (values) => {
        props.addComment(props.postsData, props.post.id, props.currentUser.photoURL, props.currentUser.name, props.currentUser.uid,
            values[`newCommentText${props.post.id}`])
    }
    return (
        <div className={css.post}>
            {isDisplayPostPhoto && <PopUpWindow photoURL={props.post.uploadedPostPhoto} isProfilePhoto={true}
                                                setIsOpen={() => setIsDisplayPostPhoto(false)}/>}
            <div className={css.post__img}>
                <NavLink onClick={() => {// when user click on other user link then loading data of this user
                    props.getUserPosts(props.post.whosePostUserUid)
                    props.getUsersFollowsAndFollowers(props.user, props.post.whosePostUserUid)
                }}
                         to={props.post.whosePostUserUid === props.user.uid ? '/profile/myPosts' : `/profile/${props.post.whosePostUserUid}/myPosts`}>
                    <img src={props.post.postImage} alt=""/>
                </NavLink>
            </div>
            <div className={css.post__content}>
                <div className={css.post__title}>
                    <div className={css.title__name}>
                        <NavLink onClick={() => {
                            props.getUserPosts(props.post.whosePostUserUid)
                            props.getUsersFollowsAndFollowers(props.user, props.post.whosePostUserUid)
                        }}
                                 to={props.post.userUid === props.currentUser.uid ? '/profile/myPosts' : `/profile/${props.post.whosePostUserUid}/myPosts`}>
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
                    {props.post.uploadedPostPhoto !== '' && <div className={css.post__imgWrapper}>
                        <img onClick={() => setIsDisplayPostPhoto(true)} src={props.post.uploadedPostPhoto} alt=""/>
                    </div>}
                </div>
                <div className={css.post__comment}>
                    {comments}
                    {!isAllCommentsShown && <div className={'showMore-buttonWrapper'}>
                        <button onClick={() => setShowCommentIndex(showCommentIndex + 5)}
                                className={'showMore-button'}>Show more
                        </button>
                    </div>}
                </div>
                <SendCommentForm currentUser={props.currentUser} onSubmit={addComment} id={props.post.id}/>
            </div>
        </div>

    )
}

export default Post;