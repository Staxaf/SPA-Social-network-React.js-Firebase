import React, {useEffect, useState} from 'react'
import css from './ProfileInfo.module.css'
import styled from 'styled-components';
import {NavLink} from "react-router-dom";


const ProfileInfo = (props) => {
    let someText;// for textarea/// with hooks and action creators didnt work
    let dialogUid = props.currentUser.uid.substr(0, 8) + props.user.uid.substr(0, 8)// переменная для хранения uid диалога текущего пользователя с пользователем на профиле которого нахожусь
    props.dialogsData.forEach(item => {
        if(item.ownersUids.indexOf(props.currentUser.uid) !== -1 && item.ownersUids.indexOf(props.user.uid) !== -1) dialogUid = item.uid
    })

    const ProfileBlock = styled.div`
        background: url(${props.user.backgroundPhotoUrl}) no-repeat center;  
        min-height: 310px;
        background-size: cover;
`;
    let id = -1
    let uid = ''
    props.users.forEach((item, index) => {
        if (item.uid === props.user.uid) {
            id = index
            uid = item.uid
        }
    })

    console.log(props.isModalMessageOpen)
    // создал стайл компонент, чтобы сделать кастомный бекграунд у пользователя

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
                                props.getUsersFollowsAndFollowers(props.currentUser, props.uidFromUrl)
                            }}>{props.users[id].isFollow ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                    </div>
                    : <div></div>}
            </div>
        </ProfileBlock>
    )
}
/*<button onClick={() => {
                    props.addFollow(props.id, props.uid, props.currentUser, props.userUid, props.currentUserId)
                }}>{props.isFollow ? 'Unfollow' : 'Follow'}</button>
 */
export default ProfileInfo;