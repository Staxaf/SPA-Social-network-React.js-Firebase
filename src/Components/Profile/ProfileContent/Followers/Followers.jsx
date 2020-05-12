import React from 'react'
import Friend from "../Friends/Friend/Friend";
import Loader from "react-loader-spinner";
import css from "../Friends/Friends.module.css";

const Followers = props => {
    return <div className={css.friends}>
        {props.isLoaded ? props.followers.map(item => <Friend state={item.state} uid={item.uid} name={item.name} photoURL={item.photoURL}
                                                              backgroundPhotoUrl={item.backgroundPhotoUrl}/>)

            : <div className="text-center">
                <Loader type="Oval" color="#00BFFF" height={40} width={40}/>
            </div>}
    </div>
}

export default Followers