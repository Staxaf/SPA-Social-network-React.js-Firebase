import React from 'react'
import Friend from "./Friend/Friend";
import css from './Friends.module.css'
import Loader from "react-loader-spinner";

const Friends = props => {

        return<div className={css.friends}>
                 {props.follows.map(item => <Friend uid={item.uid} name={item.name} photoURL={item.photoURL}
                                                             backgroundPhotoUrl={item.backgroundPhotoUrl}/>)}
            </div>

}

export default Friends