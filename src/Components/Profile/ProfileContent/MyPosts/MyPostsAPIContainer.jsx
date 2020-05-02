import React from 'react'
import firebase from "../../../../firebase";
import MyPosts from "./MyPosts";
import {usersAPI} from "../../../../redux/api";

class MyPostsAPIContainer extends React.Component {

    componentDidMount = () => {
        //debugger
        //this.props.setUser(this.props.user.name, this.props.user.photoURL, this.props.user.uid)
        this.props.getUsersFollowsAndFollowers(this.props.user, this.props.uidFromUrl)
        this.props.getUserPosts(this.props.uidFromUrl)
    }
    render = () => {
        return <MyPosts getUserPosts={this.props.getUserPosts}
                        getUsersFollowsAndFollowers={this.props.getUsersFollowsAndFollowers}
                        {...this.props} />
    }
}


export default MyPostsAPIContainer;