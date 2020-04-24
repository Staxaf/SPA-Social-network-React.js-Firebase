import React from 'react'
import css from './NavBar.module.css'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className={`${css.nav} bg-shadow`}>
            <div className={css.item}>
                <i className="far fa-user"></i>
                <NavLink to='/profile/myPosts' activeClassName={css.active}>Profile</NavLink>
            </div>
            <div className={css.item}>
                <i className="far fa-envelope"></i>
                <NavLink to='/dialogs' activeClassName={css.active}>Messages</NavLink>
            </div>
            <div className={css.item}>
                <i className="fas fa-user-friends" />
                <NavLink to='/users' activeClassName={css.active}>Users</NavLink>
            </div>
            <div className={css.item}>
                <i className="far fa-newspaper"></i>
                <NavLink to='/news' activeClassName={css.active}>News</NavLink>
            </div>
            <div className={css.item}>
                <i className="fas fa-music"></i>
                <NavLink to='/music' activeClassName={css.active}>Music</NavLink>
            </div>
            <div className={css.item}>
                <i className="fas fa-toolbox"></i>
                <NavLink to='/settings' activeClassName={css.active}>Settings</NavLink>
            </div>
        </nav>
    )
}

export default NavBar;