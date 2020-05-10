import React, {useEffect, useState} from 'react'
import css from './ProfileInfo.module.css'
import styled from 'styled-components';
import {NavLink} from "react-router-dom";


const ProfileInfo = (props) => {
    let dialogUid = props.currentUser.uid.substr(0, 8) + props.user.uid.substr(0, 8)// переменная для хранения uid диалога текущего пользователя с пользователем на профиле которого нахожусь
    props.dialogsData.forEach(item => {
        if (item.ownersUids.indexOf(props.currentUser.uid) !== -1 && item.ownersUids.indexOf(props.user.uid) !== -1) dialogUid = item.uid
    })

    // создал стайл компонент, чтобы сделать кастомный бекграунд у пользователя
    const ProfileBlock = styled.div`
        background: url(${props.user.backgroundPhotoUrl}) no-repeat center;  
        height: 310px;
        background-size: cover;
        @media screen and (max-width: 1300px){
            height: 250px;
            margin-bottom: 200px;
        }
        @media screen and (max-width: 900px){
            margin-bottom: 120px;
        }
`;
    let id = 0
    let uid = ''
    props.users.forEach((item, index) => {
        if (item.uid === props.user.uid) {
            id = index
            uid = item.uid
        }
    })

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
                        <NavLink className={css.menu__link} to='myPosts' activeClassName={css.active}>
                            <span className={css.menu__item}>Posts</span>
                            <span className={css.menu__icon}><i className="far fa-clone"/></span>
                        </NavLink>
                        <li className={css.menu__link}>
                            <span className={css.menu__item}>About</span>
                            <span className={css.menu__icon}><i className="far fa-address-card" /></span>
                        </li>
                        <NavLink className={css.menu__link} to='friends' activeClassName={css.active}>
                            <span className={css.menu__item}>{props.followsCount} Follows</span>
                            <span className={css.menu__icon}><i className="fas fa-user-check" /></span>
                        </NavLink>
                        <NavLink className={css.menu__link} to='followers' activeClassName={css.active}>
                            <span className={css.menu__item}>{props.followersCount} Followers</span>
                            <span className={css.menu__icon}><i className="fas fa-users" /></span>
                        </NavLink>
                        {/*<li className={css.menu__link}>
                            <span className={css.menu__item}>Album</span>
                            <span className={css.menu__icon}><i className="far fa-images" /></span>
                        </li> */}
                    </ul>
                </div>
                {props.currentUser.uid !== props.user.uid && props.users.length > 0 ?
                    <div className={css.buttons}>
                        <div className="user__button send__message">
                            <NavLink to={`/dialogs/${dialogUid}`}>
                                <button onClick={() => {
                                    props.getDialogsData(props.currentUser)
                                    props.createDialogAndRedirect(props.user, props.currentUser, props.dialogsData, dialogUid)
                                }}>Send a message
                                </button>
                            </NavLink>
                        </div>
                        <div className="user__button">
                            <button onClick={() => {
                                props.addFollow(id, props.currentUser.uid, props.currentUser, uid, props.users)
                                //props.getUsersFollowsAndFollowers(props.currentUser, props.uidFromUrl)
                            }}>{props.users[id].isFollow ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                    </div>
                    : <div></div>}
            </div>
        </ProfileBlock>
    )
}
export default ProfileInfo;