import React from 'react'
import css from './Header.module.css'
import firebase from "./../../firebase";

const Header = (props) => {

    let logout = () => {
        firebase.auth().signOut()
    }

    return (

        <header className={css.header}>
            <div className={css.header__imgWrapper}>
                <a href='#'>
                    <img src='https://www.freelogodesign.org/file/app/client/thumb/48dcbc48-9aa1-4bf5-99ef-2468d2c1ab41_200x200.png?1586282874832' alt='' />
                </a>
            </div>
            {props.user ? <div className="burger">
                <label htmlFor="hmt">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div> : ''}
            {props.user ? <div className={css.logout}>
                <button onClick={logout}>Logout</button>
            </div> : ''}
        </header>
    )
}

export default Header

// logo: https://www.freelogodesign.org/file/app/client/thumb/48dcbc48-9aa1-4bf5-99ef-2468d2c1ab41_200x200.png?1586282874832
// logo and text : https://www.freelogodesign.org/file/app/client/thumb/e87f46e7-55b0-49d0-97e8-387d32a34268_200x200.png?1586283072726