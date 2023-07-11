import React from 'react';
import logoTransparent from '../../assets/img/footer/logotransparent.svg';
import styles from './Footer.module.scss';
function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.img}>
                <img src={logoTransparent} alt="logo" />
            </div>
            <div className={styles.info}>
                <div>
                    г. Москва, Цветной б-р, 40 <br />
                    <a href="tel:+7 495 771 21 11">+7 495 771 21 11</a><br />
                    <a href="mailto:info@skan.ru">info@skan.ru</a>
                </div>
                <p>Copyright. 2022</p>
            </div>
        </footer>
    );
}

export default Footer;
