import React from 'react'
import css from './NavBar.module.css'
import {NavLink} from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className={`${css.nav} bg-shadow`}>
            <div className={css.item}>
                <NavLink to='/profile/myPosts' className={css.item__link} activeClassName={css.active}><i
                    className="far fa-user"/></NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/dialogs' className={css.item__link} activeClassName={css.active}><i
                    className="far fa-envelope"/></NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/users' className={css.item__link} activeClassName={css.active}><i
                    className="fas fa-user-friends"/></NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/news' className={css.item__link} activeClassName={css.active}><i
                    className="far fa-newspaper"/></NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/music' className={css.item__link} activeClassName={css.active}><i
                    className="fas fa-music"/></NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/settings' className={css.item__link} activeClassName={css.active}> <i
                    className="fas fa-toolbox"/></NavLink>
            </div>
        </nav>
    )
}

export default NavBar;