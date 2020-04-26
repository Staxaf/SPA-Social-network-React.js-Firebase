import React from 'react'
import css from './MyPosts.module.css'
import Post from './Post/Post'
import firebase from "../../../firebase";
import Loader from "react-loader-spinner";


class MyPosts extends React.Component {

    render = () => {
        return <div>
            <div className={css.input}>
                <img
                    src={this.props.currentUser.photoURL}
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
                    this.props.addPost(this.props.uid, this.props.currentUser.photoURL, this.props.currentUser.name)
                }} className={css.btn}>Publish
                </button>
            </div>
            <div className={css.posts}>
                {this.props.isFetching
                    ? <div className="text-center">
                        <Loader type="Oval" color="#00BFFF" height={40} width={40}/>
                    </div> : this.props.postsData !== undefined ? this.props.postsData.map(post => (
                        <Post currentUser={this.props.currentUser} name={post.postName} photoURL={post.postImage} message={post.message}
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


export default MyPosts;