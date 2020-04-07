import React from 'react'
import css from './Header.module.css'

const Header = () => {
    return (
        <header className={css.header}>
            <a href='#'><img src='https://www.freelogodesign.org/file/app/client/thumb/d43f36bc-9814-40de-b9da-8ad62201ae6f_200x200.png?1586201496260' /></a>
        </header>
    )
}

export default Header