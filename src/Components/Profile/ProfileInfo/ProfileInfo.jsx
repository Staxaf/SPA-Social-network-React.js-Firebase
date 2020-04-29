import React from 'react'
import css from './ProfileInfo.module.css'
import styled from 'styled-components';
import {NavLink} from "react-router-dom";


const ProfileInfo = (props) => {
    let id = -1
    let uid = ''
    let isFollow = false
    props.users.forEach((item, index) => {
        if (item.uid === props.user.uid) {
            id = index
            uid = item.uid
            if(props.currentUser.follows.indexOf(uid) !== -1){
                isFollow = true
            }
        }
    })
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
                {id !== -1 ? <div className="user__button">
                    <button onClick={() => {
                        props.addFollow(id, props.currentUser.uid, props.currentUser, uid, props.users)
                    }}>{isFollow ? 'Unfollow' : 'Follow'}
                    </button>
                </div> : <p></p>}
            </div>
        </ProfileBlock>
    )
}
/*<button onClick={() => {
                    props.addFollow(props.id, props.uid, props.currentUser, props.userUid, props.currentUserId)
                }}>{props.isFollow ? 'Unfollow' : 'Follow'}</button>
 */
export default ProfileInfo;