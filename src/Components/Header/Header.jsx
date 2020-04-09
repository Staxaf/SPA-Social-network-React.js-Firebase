import React from 'react'
import css from './Header.module.css'

const Header = () => {
    return (
        <header className={css.header}>
            <a href='#'>
                <img src='https://www.freelogodesign.org/file/app/client/thumb/48dcbc48-9aa1-4bf5-99ef-2468d2c1ab41_200x200.png?1586282874832' />
            </a>
        </header>
    )
}

export default Header

// logo: https://www.freelogodesign.org/file/app/client/thumb/48dcbc48-9aa1-4bf5-99ef-2468d2c1ab41_200x200.png?1586282874832
// logo and text : https://www.freelogodesign.org/file/app/client/thumb/e87f46e7-55b0-49d0-97e8-387d32a34268_200x200.png?1586283072726