import React from 'react'
import css from './AlbumItem.module.css'

const AlbumItem = props => {
    return <div className={css.albumItem}>
        <img src={props.photoUrl} alt=""/>
    </div>
}
export default AlbumItem