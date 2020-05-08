import React from 'react'
import css from './MyPosts.module.css'
import Post from './Post/Post'
import Loader from "react-loader-spinner";
import {toggleDislikeThunk} from "../../../../redux/profile-reducer";


class MyPosts extends React.Component {
    render = () => {
        return <div>
            <div className={css.input}>
                <div className={css.input__item}>
                    <img
                        src={this.props.currentUser.photoURL}
                        alt=""/>
                    <textarea onChange={(e) => {
                        this.props.onPostChange(e.target.value)
                    }} className={css.textarea}
                              value={this.props.newPostText} />
                </div>
                <div className={css.input__item}>
                    <div className={css.icons}>
                        <button><i className="fas fa-paperclip"/></button>
                        <button><i className="far fa-laugh"/></button>
                    </div>
                    <button onClick={() => {
                        this.props.addPostThunk(this.props.newPostText, this.props.postsData, this.props.currentUser.photoURL,
                            this.props.currentUser.name, this.props.uid, this.props.currentUser.uid)
                    }} className={css.btn}>Publish
                    </button>
                </div>
            </div>
            <div className={css.posts}>
                {this.props.isFetching
                    ? <div className="text-center">
                        <Loader type="Oval" color="#00BFFF" height={40} width={40}/>
                    </div> : this.props.postsData !== undefined ? this.props.postsData.map(post => (
                        <Post user={this.props.user} whosePostUserUid={post.whosePostUserUid} postsData={this.props.postsData}
                              currentUser={this.props.currentUser} name={post.postName}
                              photoURL={post.postImage} message={post.message}
                              dislikeCounts={post.dislikeCounts} userUid={post.userUid}
                              whoIsLikeList={post.whoIsLikeList} whoIsDislikeList={post.whoIsDislikeList}
                              viewCounts={post.viewCounts} comments={post.comments} id={post.id}
                              dateOfPublishing={post.dateOfPublishing} uid={post.uid}
                              newCommentText={post.newCommentText} updateCommentText={this.props.onCommentChange}
                              addComment={this.props.addCommentThunk} addLike={this.props.toggleLikeThunk}
                              addDislike={this.props.toggleDislikeThunk} getUserPosts={this.props.getUserPosts}
                              getUsersFollowsAndFollowers={this.props.getUsersFollowsAndFollowers}/>
                    )) : ''}

            </div>
        </div>
    }
}


export default MyPosts;