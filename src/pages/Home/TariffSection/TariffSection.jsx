import React from 'react';
import TariffCard from '../../../components/TariffCard/TariffCard';

import { cardInfo } from '../../../components/TariffCard/mock';

import styles from './TariffSection.module.scss';
import { useSelector } from 'react-redux';

function TariffSection() {
    const { isAuth } = useSelector((state) => state.auth);
    return (
        <section>
            <h2>наши тарифы</h2>
            <div className={styles.tariffWrapper}>
                {cardInfo.map((tariff, index) => (
                    <TariffCard key={tariff.titlte} isAuth={index === 0 ? isAuth : null} {...tariff} />
                ))}
            </div>
        </section>
    );
}

export default TariffSection;
