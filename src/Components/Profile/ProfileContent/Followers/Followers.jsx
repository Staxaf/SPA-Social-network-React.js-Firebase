import React from 'react'
import Friend from "../Friends/Friend/Friend";
import Loader from "react-loader-spinner";
import css from "../Friends/Friends.module.css";

const Followers = props => {
    return <div className={css.friends}>
        {props.followers.map(item => <Friend uid={item.uid} name={item.name} photoURL={item.photoURL}
                                             backgroundPhotoUrl={item.backgroundPhotoUrl}/>)}
    </div>
}

export default Followers