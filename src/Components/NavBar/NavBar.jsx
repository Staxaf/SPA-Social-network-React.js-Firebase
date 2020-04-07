import React from 'react'
import css from './NavBar.module.css'

const NavBar = () => {
    return (
        <nav className={css.nav}>
            <div className={css.item}>
                <i className="far fa-user"></i>
                <a href='/profile'>Profile</a>
            </div>
            <div className={css.item}>
                <i className="far fa-envelope"></i>
                <a href='/dialogs'>Messages</a>
            </div>
            <div className={css.item}>
                <i className="far fa-newspaper"></i>
                <a href='/news'>News</a>
            </div>
            <div className={css.item}>
                <i className="fas fa-music"></i>
                <a href='/music'>Music</a>
            </div>
            <div className={css.item}>
                <i className="fas fa-toolbox"></i>
                <a href='/settings'>Settings</a>
            </div>
        </nav>
    )
}

export default NavBar;