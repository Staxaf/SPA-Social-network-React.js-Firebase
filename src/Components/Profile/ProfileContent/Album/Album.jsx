import React, {useEffect, useState} from 'react'
import css from './Album.module.css'
import AlbumItem from "./AlbumItem/AlbumItem";
import {connect} from "react-redux";
import {changeProfilePhotoThunk, deletePhotoThunk} from "../../../../redux/profile-reducer";

const Album = props => {

    const [imageIndex, setImageIndex] = useState(6)
    const [isAllPhotoShown, setIsAllPhotoShown] = useState(false)
    const [photos, setPhotos] = useState([])
    const setPhotoJsx = () => {
        if(props.user.photos.length === 0) setIsAllPhotoShown(true)
        setPhotos(props.user.photos.map((item, key) => {
            //if (props.user.photos.length === key) setIsAllPhotoShown(true)
            if (key < imageIndex) {
                if(props.user.photos.length === key + 1) setIsAllPhotoShown(true)
                return <AlbumItem key={key} id={key} currentUser={props.currentUser} user={props.user} photoUrl={item}
                                  changeProfilePhotoThunk={props.changeProfilePhotoThunk} deletePhotoThunk={props.deletePhotoThunk} />
            }
        }))
    }
    useEffect(() => {
        setPhotoJsx()
    }, [imageIndex])
    useEffect(() => {
        setPhotoJsx()
    }, [props.user.photos])
    return <div className={css.album}>
        <div className={css.album__items}>
            {photos}
        </div>
        {!isAllPhotoShown && <div className={'showMore-buttonWrapper'} >
            <button className={'showMore-button'} onClick={() => setImageIndex(imageIndex + 6)}>Show more</button>
        </div>}
    </div>
}

export default connect(null, {changeProfilePhotoThunk, deletePhotoThunk})(Album)