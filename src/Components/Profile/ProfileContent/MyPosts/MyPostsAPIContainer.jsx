import React, {useEffect} from 'react'
import MyPosts from "./MyPosts";

const MyPostsAPIContainer = props => {

    useEffect(() => {
        props.getUsersFollowsAndFollowers(props.user, props.uidFromUrl)
        props.getUserPosts(props.uidFromUrl)
    }, [props.uidFromUrl])

    return <MyPosts {...props} />
}


export default MyPostsAPIContainer;