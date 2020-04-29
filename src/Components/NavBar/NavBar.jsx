import React from 'react'
import css from './NavBar.module.css'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className={`${css.nav} bg-shadow`}>
            <div className={css.item}>
                <i className="far fa-user"/>
                <NavLink to='/profile/myPosts' className={css.item__link} activeClassName={css.active}>Profile</NavLink>
            </div>
            <div className={css.item}>
                <i className="far fa-envelope"/>
                <NavLink to='/dialogs' className={css.item__link} activeClassName={css.active}>Messages</NavLink>
            </div>
            <div className={css.item}>
                <i className="fas fa-user-friends" />
                <NavLink to='/users' className={css.item__link} activeClassName={css.active}>Users</NavLink>
            </div>
            <div className={css.item}>
                <i className="far fa-newspaper"/>
                <NavLink to='/news' className={css.item__link} activeClassName={css.active}>News</NavLink>
            </div>
            <div className={css.item}>
                <i className="fas fa-music"/>
                <NavLink to='/music' className={css.item__link} activeClassName={css.active}>Music</NavLink>
            </div>
            <div className={css.item}>
                <i className="fas fa-toolbox"/>
                <NavLink to='/settings' className={css.item__link} activeClassName={css.active}>Settings</NavLink>
            </div>
        </nav>
    )
}

export default NavBar;