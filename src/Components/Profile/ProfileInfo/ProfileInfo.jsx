import React, {useEffect, useState} from 'react'
import css from './ProfileInfo.module.css'
import styled from 'styled-components';
import {NavLink} from "react-router-dom";
import firebase from "../../../firebase";
import PopUpWindow from "../ProfileContent/Album/AlbumItem/PopUpWindow";


const ProfileInfo = (props) => {
    const [isOpenWindow, setIsOpenWindow] = useState(false)
    let dialogUid
    if(Object.keys(props.user).length !== 0) {
        dialogUid = props.currentUser.uid.substr(0, 8) + props.user.uid.substr(0, 8)// a variable to store dialog uid
    }
    // of current user with the user on whose profile page I am
    props.dialogsData.forEach(item => {
        if (item.ownersUids.indexOf(props.currentUser.uid) !== -1 && item.ownersUids.indexOf(props.user.uid) !== -1) dialogUid = item.uid
    })

    //created a styled component to do custom background at the user
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

    const choosePhoto = (e) => {
        if(e.target.files[0]) {
            props.uploadImageThunk(props.user, e.target.name, e.target.files[0])
        }
    }

    return (
        <ProfileBlock>
            {isOpenWindow && <PopUpWindow photoURL={props.user.photoURL} isProfilePhoto={true} setIsOpen={() => setIsOpenWindow(false)} />}
            <div className={css.wrapper}>
                {props.currentUser.uid === props.user.uid &&
                <div className={css.inputBackgroundPhoto__wrapper}>
                    <input onChange={choosePhoto} type="file" accept=".jpg" name="backgroundPhotoUrl" id="backgroundPhotoUrl"/>
                    <label htmlFor="backgroundPhotoUrl"><i className="far fa-edit" /></label>
                </div>}
                <div className={css.profile__nav}>
                    <div className={css.profile__avatar}>
                        <div className={css.profile__img}>
                            <div className={css.img__wrapper}>
                                <img onClick={() => setIsOpenWindow(true)} src={props.user.photoURL}/>
                                {props.currentUser.uid === props.user.uid &&
                                <>
                                    <input onChange={choosePhoto} type="file" accept=".jpg" name="photoURL" id="photoURL" className="inputFile"/>
                                    <label htmlFor="photoURL"><i className="fas fa-pencil-alt" /></label>
                                </>}

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
                            <NavLink className={css.menu__link} to='album' activeClassName={css.active}>
                                <span className={css.menu__item}>Album</span>
                                <span className={css.menu__icon}><i className="far fa-address-card"/></span>
                            </NavLink>
                            <NavLink className={css.menu__link} to='friends' activeClassName={css.active}>
                                <span className={css.menu__item}>{props.followsCount} Follows</span>
                                <span className={css.menu__icon}><i className="fas fa-user-check"/></span>
                            </NavLink>
                            <NavLink className={css.menu__link} to='followers' activeClassName={css.active}>
                                <span className={css.menu__item}>{props.followersCount} Followers</span>
                                <span className={css.menu__icon}><i className="fas fa-users"/></span>
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
                                }}>{props.users[id].isFollow ? 'Unfollow' : 'Follow'}
                                </button>
                            </div>
                        </div>
                        : <div/>}
                </div>
            </div>
        </ProfileBlock>
    )
}
export default ProfileInfo;