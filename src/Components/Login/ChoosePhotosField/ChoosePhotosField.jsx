import React from 'react'
import css from './ChoosePhotosField.module.css'
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import firebase from "./../../../firebase";

const ChoosePhotosField = props => {

    const BackgroundPhotoContainer = styled.div`
        background: ${props.backgroundPhotoUrl !== '' ? `url(${props.backgroundPhotoUrl}) no-repeat center` : 'grey'} ;
        background-size: cover;
        padding: 10px;       
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        margin: 40px 20px;
    `

    let choosePhoto = (e) => {
        console.log(e.target.files[0].name)
    }

    console.log('photo: ', props.photoURL)
    return <div className={css.choosePhoto__wrapper}>
        <BackgroundPhotoContainer>
            <div className={css.friends__item}>
                <div className={css.choosePhoto__buttonWrapper}>
                    <button className={css.choosePhoto__button}>Choose a background photo</button>
                </div>
                <div className={css.choosePhoto__img}>
                    {props.photoURL !== '' ? <img src={props.photoURL} alt=""/> :
                        <div className={css.greyCircle}>
                            <input onChange={(e) => {
                                props.setPhotos(e.target.files[0].name, 'photoURL')
                            }} type="file" className={css.choosePhoto__input} />
                        </div>}
                        <div className={css.choosePhoto__uploadIconWrapper}><i className="fas fa-cloud-upload-alt" /></div>
                </div>
                <h4 className={css.friends__name}>{props.name}</h4>
            </div>
        </BackgroundPhotoContainer>
    </div>
}

export default ChoosePhotosField