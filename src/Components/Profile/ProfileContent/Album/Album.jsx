import React from 'react'
import css from './Album.module.css'
import AlbumItem from "./AlbumItem/AlbumItem";

const Album = props => {

    let photos = props.user.photos.map(item => <AlbumItem photoUrl={item}/>)

    return <div className={css.album}>
        <div className={css.album__items}>
            {photos}
        </div>
    </div>
}

export default Album