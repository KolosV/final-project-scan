import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import logo from '../../assets/img/footer/logotransparent.svg';
import styles from './MobileNav.module.scss';
function MobileNav({ showMobileNav, setShowMobileNav }) {
    return (
        <div className={`${styles.mobileNav} ${showMobileNav ? styles.active : ''}`}>
            <div className={styles.menuHeader}>
                <img src={logo} alt="logo" />
            </div>
            <ul className={styles.navigate}>
                <Link className={styles.navigateItem} to="/">
                    Главная
                </Link>
                <li className={styles.navigateItem}>Тарифы</li>
                <li className={styles.navigateItem}>FAQ</li>
            </ul>
            <div className={styles.accountWrapper}>
                <p className={styles.accountWrapper__register}>Зарегистрироваться</p>
                <Link to="/login">
                    <Button
                        onClick={() => setShowMobileNav(false)}
                        styles={styles.accountWrapper__loginBtn}
                    >
                        Войти
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default MobileNav;
