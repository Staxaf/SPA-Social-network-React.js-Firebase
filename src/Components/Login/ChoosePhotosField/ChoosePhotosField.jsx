import React from 'react'
import css from './ChoosePhotosField.module.css'
import styled from "styled-components";
import firebase from "./../../../firebase";

const ChoosePhotosField = props => {

    const BackgroundPhotoContainer = styled.div`
        background: ${props.backgroundPhotoUrl !== '' ? `url(${props.backgroundPhotoUrl}) no-repeat center` : 'grey'} ;
        background-size: cover;
        padding: 10px;       
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        margin: 40px 0;
    `

    let choosePhoto = (e) => {
        let image = e.target.files[0]
        let name = e.target.name
        firebase.storage().ref(`images/${image.name}`).put(image).on('state_changed',
            (snapshot) => {
            },
            (error) => {
                console.log(error)
            },
            () => {
                firebase.storage().ref('images').child(image.name).getDownloadURL().then(url => {
                    props.setPhotos(url, name)
                })
            })
    }

    console.log('photo: ', props.photoURL)
    return <div className={css.choosePhoto__wrapper}>
        <BackgroundPhotoContainer>
            <div className={css.friends__item}>
                <div className={css.choosePhoto__buttonWrapper}>
                    {props.backgroundPhotoUrl ? '' : <input name="backgroundPhotoUrl" type="file" onChange={(e) => {
                        choosePhoto(e, 'backgroundPhotoUrl')
                    }}/>}
                </div>
                <div className={css.choosePhoto__img}>
                    {props.photoURL !== '' ? <img src={props.photoURL} alt=""/> :
                        <div className={css.greyCircle}>
                            <input name="photoURL" onChange={(e) => {
                                choosePhoto(e, 'photoURL')
                            }} type="file" className={css.choosePhoto__input}/>
                        </div>}
                    {props.photoURL ? '' :
                        <div className={css.choosePhoto__uploadIconWrapper}><i className="fas fa-cloud-upload-alt"/>
                        </div>}
                </div>
                <h4 className={css.friends__name}>{props.name}</h4>
            </div>
        </BackgroundPhotoContainer>
    </div>
}

export default ChoosePhotosField