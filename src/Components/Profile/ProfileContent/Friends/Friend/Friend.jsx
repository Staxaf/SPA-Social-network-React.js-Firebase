import React from 'react'
import css from '../Friends.module.css'
import styled from 'styled-components';
import {NavLink} from "react-router-dom";

const Friend = props => {

    const FriendContainer = styled.div`
        background: url(${props.backgroundPhotoUrl}) no-repeat center;
        background-size: cover;
        padding: 10px;       
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        margin: 0 30px;
    `

    return <div className={css.friends__item_container}>
        <FriendContainer>
            <NavLink to={`/profile/${props.uid}/myPosts`}>
                <div className={css.friends__item}>
                    <div className={css.friends__img}>
                        <img src={props.photoURL} alt=""/>
                    </div>
                    <div className={`${css.friend__circleWrapper} whiteCircle`}>
                        <div className={`${css.friend__circle} ${props.state === 'online' ? ' greenCircle' : ' greyCircle'}` }  />
                    </div>
                    <h4 className={css.friends__name}>{props.name}</h4>
                </div>
            </NavLink>
        </FriendContainer>
    </div>
}

export default Friend