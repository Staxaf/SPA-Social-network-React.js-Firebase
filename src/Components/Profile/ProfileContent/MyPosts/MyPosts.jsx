import React, {useEffect, useState} from 'react'
import css from './MyPosts.module.css'
import Post from './Post/Post'
import Loader from "react-loader-spinner";
import {Field, reduxForm} from "redux-form";
import PopUpWindow from "../Album/AlbumItem/PopUpWindow";

let MyPostsForm = props => {
    const onPhotoChange = (e) => {
        if (e.target.files[0]) {
            props.uploadPostPhoto(props.currentUser, e.target.files[0])
        }
    }

    return <form onSubmit={props.handleSubmit} className={css.input}>
        <div className={css.input__item}>
            <img
                src={props.currentUser.photoURL}
                alt=""/>
            <Field component="textarea" name="newPostText" className={css.textarea}/>
        </div>
        <div className={css.input__item}>
            <div className={css.icons}>
                <input onChange={onPhotoChange} type="file" accept=".jpg" name="myPostPhoto" id="myPostPhoto"/>
                <label htmlFor="myPostPhoto"><i className="fas fa-paperclip"/></label>
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
    const [isOpenPhotoWindow, setIsOpenPhotoWindow] = useState(false)
    const [showPostIndex, setShowPostIndex] = useState(7)
    const [posts, setPosts] = useState([])
    const [isAllPostsShown, setIsAllPostsShown] = useState(false)
    let onSubmit = values => {
        console.log(values)
        props.addPostThunk(values.newPostText, props.postsData, props.currentUser.photoURL, props.currentUser.name, props.user.uid, props.currentUser.uid, props.uploadedPostPhoto)
    }
    const setPostsJsx = () => {
        if(props.postsData.length === 0) setIsAllPostsShown(true)
        setPosts(props.postsData.map((post, key) => {
            if(key < showPostIndex) {
                if(props.postsData.length === key + 1) setIsAllPostsShown(true)
                else setIsAllPostsShown(false)
                return <Post key={key} post={post} user={props.user} postsData={props.postsData}
                             currentUser={props.currentUser} updateCommentText={props.onCommentChange}
                             addComment={props.addCommentThunk} addLike={props.toggleLikeThunk}
                             addDislike={props.toggleDislikeThunk} getUserPosts={props.getUserPosts}
                             getUsersFollowsAndFollowers={props.getUsersFollowsAndFollowers}/>
            }
        }))
    }
    useEffect(() => {
        setPostsJsx()
    }, [props.postsData])
    useEffect(() => {
        setPostsJsx()
    }, [showPostIndex])


    return <div className={css.posts__wrapper}>
        {isOpenPhotoWindow && <PopUpWindow photoURL={props.uploadedPostPhoto} isProfilePhoto={true}
                                           setIsOpen={() => setIsOpenPhotoWindow(false)}
        />}
        <div className={css.posts}>
            <MyPostsForm onSubmit={onSubmit} currentUser={props.currentUser} uploadPostPhoto={props.uploadPostPhoto}/>
            {props.isPostPhotoUploading && <div className="text-center">
                <Loader type="Oval" color="#00BFFF" height={40} width={40}/>
            </div>}
            {props.uploadedPostPhoto !== '' && <div className={css.posts__selectedPhoto}>
                <img onClick={() => setIsOpenPhotoWindow(true)} src={props.uploadedPostPhoto} alt=""/>
                <button onClick={() => props.setUploadedPostPhoto('')} className={css.posts__close}>x</button>
            </div>}
            {props.isFetching
                ? <div className="text-center">
                    <Loader type="Oval" color="#00BFFF" height={40} width={40}/>
                </div> : posts}
        </div>
        {!isAllPostsShown && <div className={'showMore-buttonWrapper'}>
            <button onClick={() => setShowPostIndex(showPostIndex + 7)} className={'showMore-button'}>Show more</button>
        </div>}
    </div>
}


export default MyPosts;