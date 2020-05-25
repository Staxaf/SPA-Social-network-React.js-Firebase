import React, {useState} from 'react'
import css from './AlbumItem.module.css'
import PopUpWindow from "./PopUpWindow";

const AlbumItem = props => {
    const [isOpen, setIsOpen] = useState(false)

    return <div className={css.albumItem}>
        {isOpen &&
        <PopUpWindow user={props.user} id={props.id} currentUser={props.currentUser} photoURL={props.photoUrl} isProfilePhoto={false}
                     setIsOpen={() => {
                         setIsOpen(false)
                     }} changeProfilePhotoThunk={props.changeProfilePhotoThunk} deletePhotoThunk={props.deletePhotoThunk}/>}
        <img onClick={() => setIsOpen(true)} src={props.photoUrl} alt=""/>
    </div>
}
export default AlbumItem