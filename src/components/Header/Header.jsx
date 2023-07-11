import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthorization } from '../../store/authorization/authorization-actions';

import logo from '../../assets/img/header/logo.svg';
import accauntLogo from '../../assets/img/header/accauntlogo.svg';
import loaderImg from '../../assets/img/preloader/loader.svg';

import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import MobileNav from '../MobileNav/MobileNav';

function Header() {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.auth);
    const { usedCompany, limitCompany, isLoading, error } = useSelector(
        (state) => state.infoAccount,
    );
    const [showMobileNav, setShowMobileNav] = useState(false);

    useEffect(() => {
        if (showMobileNav) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [showMobileNav]);
    console.log(showMobileNav);
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                <img src={logo} alt="logo" />
            </Link>

            <ul className={styles.navigate}>
                <Link to="/">Главная</Link>
                <li>Тарифы</li>
                <li>FAQ</li>
            </ul>

            <MobileNav
                showMobileNav={showMobileNav}
                setShowMobileNav={setShowMobileNav}
            />
            {isAuth ? (
                <div className={styles.accountIsLogged}>
                    <div className={styles.info}>
                        {isLoading ? (
                            <img
                                className={styles.info__loading}
                                src={loaderImg}
                                alt="loader"
                            />
                        ) : (
                            <>
                                {error ? (
                                    <span className={styles.info__error}>{error}</span>
                                ) : (
                                    <>
                                        <p>
                                            Использовано компаний{' '}
                                            <span>{usedCompany}</span>
                                        </p>
                                        <p>
                                            Лимит по компаниям{' '}
                                            <span style={{ color: '#8AC540' }}>
                                                {limitCompany}
                                            </span>
                                        </p>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    <div className={styles.accauntWrapper}>
                        <div className={styles.accauntWrapper__info}>
                            <p>Алексей А.</p>
                            <button onClick={() => dispatch(resetAuthorization())}>
                                Выйти
                            </button>
                        </div>
                        <div className={styles.accauntWrapper__img}>
                            <img src={accauntLogo} alt="accauntLogo" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.accountIsNotLogged}>
                    <button disabled className={styles.accountIsNotLogged__register_btn}>
                        Зарегистрироваться
                    </button>
                    <Link to="/login" className={styles.accountIsNotLogged__singIn_btn}>
                        Войти
                    </Link>
                </div>
            )}
            <div
                onClick={() => setShowMobileNav(!showMobileNav)}
                className={`${styles.mobileNavBtn} ${
                    showMobileNav ? styles.activeNav : ''
                }`}
            >
                <div className={styles.navBlock}></div>
                <div className={styles.navBlock}></div>
                <div className={styles.navBlock}></div>
            </div>
        </header>
    );
}

export default Header;
