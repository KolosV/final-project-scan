import React from 'react';
import Slider from 'react-slick';
import arrowSlider from '../../../assets/img/slider/arrowSlider.svg';
import slide1 from '../../../assets/img/slider/slide1.svg';

import styles from './AboutSection.module.scss';

function ArrowNext({ onClick }) {
    return (
        <img
            onClick={onClick}
            className={styles.arrowNext}
            src={arrowSlider}
            alt="arrow next"
        />
    );
}

function ArrowPrev({ onClick }) {
    return (
        <img
            className={styles.arrowPrev}
            onClick={onClick}
            src={arrowSlider}
            alt="arrow prev"
        />
    );
}

function AboutSection() {
    const settings = {
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <ArrowNext />,
        prevArrow: <ArrowPrev />,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                },
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };
    return (
        <section className={styles.about}>
            <h2>Почему именно мы</h2>
            <Slider {...settings}>
                {new Array(10).fill('a').map((item,index) => (
                    <div key={index}>
                        <img className={styles.imgSlider} src={slide1} alt="" />
                        <p>Высокая и оперативная скорость обработки заявки</p>
                    </div>
                ))}
            </Slider>
        </section>
    );
}

export default AboutSection;
