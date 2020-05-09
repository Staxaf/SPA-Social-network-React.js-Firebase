import React from 'react'
import css from './NavBar.module.css'
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {


    return (
        <>

            <input type="checkbox" id="hmt" className="burger__check" />
            <nav className={`nav bg-shadow`}>
                <div className={css.userInfo}>
                    <div className={css.userInfo__imgWrapper}>
                        <img src={props.user.photoURL} alt="" />
                    </div>
                    <h5 className={css.userInfo__name}>{props.user.name}</h5>
                </div>
                <NavLink to='/profile/myPosts' className={css.item__link} activeClassName={css.active}>
                    <div className={css.item}>
                        <i className="far fa-user" />
                        <span className={css.item__name}>Profile</span>
                    </div>
                </NavLink>

                <NavLink to='/dialogs' className={css.item__link} activeClassName={css.active}>
                    <div className={css.item}>
                        <i className="far fa-envelope" />
                        <span className={css.item__name}>Dialogs</span>
                    </div>
                </NavLink>
                <NavLink to='/users' className={css.item__link} activeClassName={css.active}>
                    <div className={css.item}>
                        <i className="fas fa-user-friends" />
                        <span className={css.item__name}>Users</span>
                    </div>
                </NavLink>
                <NavLink to='/news' className={css.item__link} activeClassName={css.active}>
                    <div className={css.item}>
                        <i className="far fa-newspaper" />
                        <span className={css.item__name}>Feed</span>
                    </div>
                </NavLink>
                <NavLink to='/music' className={css.item__link} activeClassName={css.active}>
                    <div className={css.item}>
                        <i className="fas fa-music" />
                        <span className={css.item__name}>Music</span>
                    </div>
                </NavLink>
                <NavLink to='/settings' className={css.item__link} activeClassName={css.active}>
                    <div className={css.item}>
                        <i className="fas fa-toolbox" />
                        <span className={css.item__name}>Settings</span>
                    </div>
                </NavLink>
            </nav>
        </>
    )
}

export default NavBar;