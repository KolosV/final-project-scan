import React from 'react';
import checkMark from '../../assets/img/cards/check-mark.svg';
import Button from '../UI/Button/Button';
import styles from './TariffCard.module.scss';

function TariffCard({
    img,
    titlte,
    subTitle,
    oldPrice,
    price,
    info,
    currentTariff,
    includes,
    color,
    isAuth
}) {
    
    return (
        <div
            style={isAuth ? { border: `2px solid ${color}` } : {}}
            className={styles.card}
        >
            <div style={{ background: color }} className={styles.cardTitle}>
                <div style={color === '#000' ? { color: '#fff' } : {}}>
                    <h3>{titlte}</h3>
                    <p>{subTitle}</p>
                </div>
                <img src={img} alt="imagecard" />
            </div>

            <div className={styles.cardInfo}>
                {isAuth && (
                    <span className={styles.currentTariff}>Текущий тариф</span>
                )}

                <div
                    style={info ? {} : { marginBottom: '91px' }}
                    className={styles.price}
                >
                    <p>{price.toLocaleString('ru-RU')} ₽</p>
                    <span>{oldPrice.toLocaleString('ru-RU')} ₽</span>
                </div>

                {info && <p className={styles.conditions}>{info}</p>}

                <div className={styles.tariffIncludes}>
                    <h3>В тариф входит:</h3>
                    {includes.map((item, index) => (
                        <div key={`${item}_${index}`}>
                            <img src={checkMark} alt="mark" />
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.btnWrapper}>
                <Button
                    styles={currentTariff ? styles.currentTariffBtn : styles.tariffBtn}
                >
                    {currentTariff ? 'Перейти в личный кабинет' : 'Подробнее'}
                </Button>
            </div>
        </div>
    );
}

export default TariffCard;
