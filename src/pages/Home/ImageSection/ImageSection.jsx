import React from 'react'
import image1 from '../../../assets/img/home/ImageSection1.svg'
import image2 from '../../../assets/img/home/ImageSection2.svg'
import styles from './ImageSection.module.scss'
function ImageSection() {
  return (
    <section className={styles.imageSection}>
        <div className={styles.leftWrapper}>
            <img src={image1} alt="img" />
        </div>
        <div className={styles.rightWrapper}>
            <img src={image2} alt="img" />
        </div>
    </section>
  )
}

export default ImageSection