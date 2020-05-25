import React from 'react'
import css from './AlbumItem.module.css'

const PopUpWindow = props => {
    return <div className={css.popup}>
       <div className={css.popup__wrapper}>
           <div className={css.popup__imgWrapper}>
               <img src={props.photoURL} alt=""/>
               <div>
                   <button onClick={props.setIsOpen} className={css.popup__close}>x</button>
               </div>
               {!props.isProfilePhoto && props.user.uid === props.currentUser.uid && <div className={css.popup__settingsIcon}>
                   <i className="fas fa-cog" />
                   <nav className={css.popup__settings}>
                       <li onClick={() => {
                           props.changeProfilePhotoThunk(props.user, props.photoURL, 'photoURL')
                       }} ><i className="fas fa-user-alt" /> Make profile picture</li>
                       <li onClick={() => {
                           props.changeProfilePhotoThunk(props.user, props.photoURL, 'backgroundPhotoUrl')
                       }}><i className="far fa-address-card" /> Make background profile picture</li>
                       <li onClick={() => {
                           props.setIsOpen()
                           props.deletePhotoThunk(props.user, props.id, props.user.photos)
                       }} ><i className="far fa-trash-alt" /> Delete picture</li>
                   </nav>
               </div>}
           </div>
       </div>
    </div>
}

export default PopUpWindow