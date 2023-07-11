import React from 'react';
import cartImg from '../../assets/img/resultCard/1.png';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import styles from './ResultCard.module.scss';

function ResultCard({ issueDate, url, source, title, attributes, content }) {
    const markup = DOMPurify.sanitize(content.markup, {
        USE_PROFILES: { html: true },
        ALLOWED_TAGS: [],
    });

    return (
        <div className={styles.resultCard}>
            <div className={styles.cardInfo}>
                <span>{new Date(issueDate).toLocaleDateString()}</span>
                <a href={url}>{source.name}</a>
            </div>
            <h3 className={styles.cardTitle}>{title.text}</h3>
            <span className={styles.cardAttributes}>Без категории</span>
            <div className={styles.cardImage}>
                <img src={cartImg} alt="docImage" />
            </div>
            <div
                className={styles.cardText}
                dangerouslySetInnerHTML={{ __html: parse(markup.slice(0, 600)+'...') }}
            ></div>
            <div className={styles.cardFooter}>
                <div className={styles.cardBtn}>
                    <button>Читать в источнике</button>
                </div>
                <div className={styles.countLetters}>
                    {/* <p>{attributes.wordCount} слова</p> */}
                    <p>{attributes.wordCount} слова</p>
                </div>
            </div>
        </div>
    );
}

export default ResultCard;
