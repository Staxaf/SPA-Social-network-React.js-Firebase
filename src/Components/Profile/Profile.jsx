import React from 'react'
import css from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'

const Profile = (props) => {
    return (
        <div>
            <div className={css.profile}>
                <div className={css.profile__img}>
                    <img src='https://i.pinimg.com/originals/90/2b/ae/902bae0be1d7b2088036ebbe09d88dc5.jpg' />
                </div>
                <div className={css.profile__info}>
                    <p>{props.name}</p>
                    <p>Birth Year: {props.birthYear}</p>
                    <p>Gender: {props.gender}</p>
                </div>
            </div>
            <MyPosts />
        </div>
    )
}

export default Profile;