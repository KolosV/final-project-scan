import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import arrowSlider from '../../assets/img/slider/arrowSliderBlack.svg';
import loaderImg from '../../assets/img/preloader/loader.svg';
import styles from './CustomSlider.module.scss';
import { useResize } from './useResize';

function CustomSlider() {
    // const screenWidth = useResize();
    const [sliderItems, setSliderItems] = useState([]);
    const [positionTrack, setPositionTrack] = useState(0);
    // const [maxIndex, setMaxIndex] = useState(Math.floor(sliderItems.length / 8));
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderTrackRef = useRef(null);
    const { status, histogramsResponse } = useSelector((state) => state.histograms);

    useEffect(() => {
        if (histogramsResponse.length !== 0) {
            const itemRisk = histogramsResponse[1].data.map((item) => item.value);
            const itemTotal = histogramsResponse[0].data.map((item, index) => ({
                ...item,
                date: new Date(item.date).toLocaleDateString(),
                risk: itemRisk[index],
            }));
            setSliderItems(itemTotal);
        }
    }, [histogramsResponse]);

    const onClickNext = () => {
        setCurrentIndex((prev) => prev + 1);
        setPositionTrack((prev) => (prev += -100));
    };
    const onClickPrev = () => {
        if (positionTrack === 0) {
            return;
        } else {
            setCurrentIndex((prev) => prev - 1);
            setPositionTrack((prev) => (prev += 100));
        }
    };

    useEffect(() => {
        sliderTrackRef.current.style.transform = `translateX(${positionTrack}%)`;
    }, [positionTrack]);


    return (
        <div className={styles.sliderWrapper}>
            <button onClick={onClickPrev} className={styles.btnPrev}>
                <img src={arrowSlider} alt="prev" />
            </button>

            <div className={styles.slider}>
                <div className={styles.infoBlock}>
                    <p>Период</p>
                    <p>Всего</p>
                    <p>Риски</p>
                </div>
                <div ref={sliderTrackRef} className={styles.slider__track}>
                    {status === 'loading' ? (
                        <div className={styles.loaderHistogram}>
                            <img
                                className={styles.loaderImg}
                                src={loaderImg}
                                alt="loader"
                            />
                            <p>Загружаем данные</p>
                        </div>
                    ) : (
                        sliderItems.map((item, index) => (
                            <div key={index} className={styles.slider__item}>
                                <p>{item.date}</p>
                                <p>{item.value}</p>
                                <p>{item.risk}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <button onClick={onClickNext} className={styles.btnNext}>
                <img src={arrowSlider} alt="next" />
            </button>
        </div>
    );
}

export default CustomSlider;
