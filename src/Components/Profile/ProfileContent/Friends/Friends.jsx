import React from 'react'
import Friend from "./Friend/Friend";
import css from './Friends.module.css'
import Loader from "react-loader-spinner";

const Friends = props => {

        return props.isLoaded ?
            <div className={css.friends}>
                 {props.follows.map(item => <Friend state={item.state} uid={item.uid} name={item.name} photoURL={item.photoURL}
                                                             backgroundPhotoUrl={item.backgroundPhotoUrl}/>)}
            </div> :
            <div className="text-center">
                <Loader type="Oval" color="#00BFFF" height={40} width={40}/>
            </div>

}

export default Friends