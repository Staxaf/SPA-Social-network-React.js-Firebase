import React from 'react'
import css from './ProfileInfo.module.css'


const ProfileInfo = (props) => {
    return (
        <div className={css.profile}>
                <div className={css.profile__nav}>
                    <div className={css.profile__avatar}>
                        <div className={css.profile__img}>
                            <div className={css.img__wrapper}>
                                <img src={props.photoURL} />
                            </div>
                            <h2 className={css.profile__name}>{props.name}</h2>
                        </div>
                    </div>
                    <div>
                        <ul className={css.profile__menu}>
                            <li className={css.active}>Posts</li>
                            <li>About</li>
                            <li>Friends</li>
                        </ul>
                    </div>
                    <div>
                        <p className={css.profile__folowers}>
                            {props.folowers} folowers
                        </p>
                    </div>
                </div>
                {/*<div className={css.profile__info}>*/}
                {/*    <p>Birth Year: {props.birthYear}</p>*/}
                {/*    <p>Gender: {props.gender}</p>*/}
                {/*</div>*/}
            </div>
    )
}

export default ProfileInfo;

// background: http://mythemestore.com/friend-finder/images/covers/1.jpg