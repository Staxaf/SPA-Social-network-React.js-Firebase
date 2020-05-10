import React from 'react'
import firebase from "../../../firebase";
import {Route} from "react-router-dom";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Followers from "./Followers/Followers";
import Friends from "./Friends/Friends";

class ProfileContentAPIContainer extends React.Component {

    componentWillUnmount() {
        this.props.setIsLoaded(false)
    }

    render = () => {
        return <>
            <Route path='/profile/:userId?/myPosts'
                   render={() => <MyPostsContainer uidFromUrl={this.props.uidFromUrl !== undefined && ['myPosts', 'friends', 'followers'].indexOf(this.props.uidFromUrl) === -1
                       ? this.props.uidFromUrl : this.props.user.uid }
                                                   currentUser={this.props.currentUser} user={this.props.user}/>}/>
            <Route path='/profile/:userId?/friends'
                   render={() => <Friends follows={this.props.followsData} isLoaded={this.props.isLoaded}
                                          user={this.props.user}/>}/>
            <Route path='/profile/:userId?/followers'
                   render={() => <Followers isLoaded={this.props.isLoaded} followers={this.props.followersData}
                                            user={this.props.user}/>}/>
        </>
    }
}

export default ProfileContentAPIContainer
