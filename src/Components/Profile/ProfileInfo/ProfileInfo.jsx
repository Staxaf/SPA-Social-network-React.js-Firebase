import React from 'react'
import css from './ProfileInfo.module.css'
import styled from 'styled-components';
import {NavLink} from "react-router-dom";


const ProfileInfo = (props) => {

    const ProfileBlock = styled.div`
        background: url(${props.user.backgroundPhotoUrl}) no-repeat center;
   
        min-height: 300px;
        background-size: cover;
`;// создал стайл компонент, чтобы сделать кастомный бекграунд у пользователя
    return (
        <ProfileBlock>
            <div className={css.profile__nav}>
                <div className={css.profile__avatar}>
                    <div className={css.profile__img}>
                        <div className={css.img__wrapper}>
                            <img src={props.user.photoURL}/>
                        </div>
                        <h2 className={css.profile__name}>{props.user.name}</h2>
                    </div>
                </div>
                <div>
                    <ul className={css.profile__menu}>
                        <NavLink to='myPosts' activeClassName={css.active}>Posts</NavLink>
                        <li>About</li>
                        <NavLink to='friends' activeClassName={css.active}>Follows</NavLink>
                        <NavLink to='followers' activeClassName={css.active}>Followers</NavLink>
                    </ul>
                </div>
                <div>
                    <p className={css.profile__folowers}>
                        {props.user.followers.length} folowers
                    </p>
                </div>
            </div>
        </ProfileBlock>
    )
}

export default ProfileInfo;