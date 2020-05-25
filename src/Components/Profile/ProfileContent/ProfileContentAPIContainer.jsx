import React from 'react'
import {Route} from "react-router-dom";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Followers from "./Followers/Followers";
import Friends from "./Friends/Friends";
import Album from "./Album/Album";

const ProfileContentAPIContainer = props => {

        return <>
            <Route path='/profile/:userId?/myPosts'
                   render={() => <MyPostsContainer uidFromUrl={props.uidFromUrl}
                                                   currentUser={props.currentUser} user={props.user}/>}/>
            <Route path='/profile/:userId?/album'
                    render={() => <Album user={props.user} currentUser={props.currentUser} />}/>
            <Route path='/profile/:userId?/friends'
                   render={() => <Friends follows={props.followsData}
                                          user={props.user}/>}/>
            <Route path='/profile/:userId?/followers'
                   render={() => <Followers followers={props.followersData}
                                            user={props.user}/>}/>
        </>
}

export default ProfileContentAPIContainer
