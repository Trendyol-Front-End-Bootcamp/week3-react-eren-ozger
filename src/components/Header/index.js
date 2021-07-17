import React from 'react'
import styles from "./styles.module.scss";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Link style={{ textDecoration: 'none' }} to={`/`}>
            <div className={styles.header}  >
                <h1 className={styles.headerTitle} >Rick And Morty API</h1>
            </div>
        </Link>
    )
}

export default Header;
