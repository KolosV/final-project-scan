import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getHistograms } from '../../store/search/histograms/histograms-actions';
import { getPublications } from '../../store/search/objectsearch/objectsearch-actions';

import arrowInput from '../../assets/img/searchPage/arrowInput.svg';
import Button from '../UI/Button/Button';

import styles from './SearchForm.module.scss';

const tonalityMock = [
    { title: 'Любая', value: 'any' },
    { title: 'Позитивная', value: 'positive' },
    { title: 'Негативная', value: 'negative' },
];
const checkBoxLabel = [
    { label: 'Признак максимальной полноты', value: 'maxFullness' },
    { label: 'Упоминания в бизнес-контексте', value: 'inBusinessNews' },
    { label: 'Главная роль в публикации', value: 'onlyMainRole' },
    { label: 'Публикации только с риск-факторами', value: 'onlyWithRiskFactors' },
    { label: 'Включать технические новости рынков' },
    { label: 'Включать анонсы и календари' },
    { label: 'Включать сводки новостей' },
];

function SearchForm() {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.histograms);
    const { token } = useSelector((state) => state.auth);
    const { documents } = useSelector((state) => state.publications);
    const [formData, setFormData] = useState({
        inn: '7710137066',
        tonality: tonalityMock[0].value,
        countDocs: '',
        dateSearch: { from: '2019-01-01', to: new Date().toISOString().slice(0, 10) },
        searchParams: {
            maxFullness: false,
            inBusinessNews: false,
            onlyMainRole: false,
            onlyWithRiskFactors: false,
        },
    });

    const [errorsForm, setErrorsForm] = useState({
        inn: '',
        countDocs: '',
        from: '',
        to: '',
    });
    const [requiredInput, setRequiredInput] = useState({
        inn: '',
        countDocs: '',
        from: '',
        to: '',
    });

    const [disabledBtn, setDisabledBtn] = useState(false);
    //стейт выпадающего списка
    const [showTonality, setShowTonality] = useState(false);
    //стейт текущей тональности
    const [currentTonality, setCurrentTonality] = useState(tonalityMock[0].title);
    //стейт тогла стрелки в инпуте даты
    const [showCalendar, setShowCalendar] = useState(false);
    const [showCalendar2, setShowCalendar2] = useState(false);

    //рефы на блоки с инпутами дат для тогла стрелок
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    //переадресация
    const navigate = useNavigate();
    const goToResultPage = () => navigate('/result-search');
    /* если кликнули не на инпуте дат, тоглим стрелку */
    useEffect(() => {
        const handleChangeDate = (event) => {
            if (!event.composedPath().includes(inputRef.current)) {
                setShowCalendar(false);
            }
            if (!event.composedPath().includes(inputRef2.current)) {
                setShowCalendar2(false);
            }
        };
        document.body.addEventListener('click', handleChangeDate);
        return () => document.body.removeEventListener('click', handleChangeDate);
    }, []);

    useEffect(() => {
        for (let key in errorsForm) {
            console.log(errorsForm[key]);
            if (!errorsForm[key]) {
                setDisabledBtn(true);
                return;
            }
        }
        for (let key in requiredInput) {
            console.log(errorsForm[key]);
            if (!requiredInput[key]) {
                setDisabledBtn(true);
                return;
            }
        }
        setDisabledBtn(false);
    }, [errorsForm, requiredInput]);
    //хэндлер ИНН
    const handleChangeInn = (value) => {
        setFormData((prev) => ({ ...prev, inn: value }));
    };
    //валидация ИНН
    const checkСorrectInn = () => {
        if (!formData.inn) {
            setRequiredInput((prev) => ({ ...prev, inn: false }));
            setErrorsForm((prev) => ({
                ...prev,
                inn: true,
            }));
            return;
        }
        const checkInn = [2, 4, 10, 3, 5, 9, 4, 6, 8];
        const innArr = formData.inn.split('');
        const innWithoutLastItem = formData.inn.split('').slice(0, -1);
        let res = 0;
        innWithoutLastItem.forEach((item, index) => (res += item * checkInn[index]));
        setErrorsForm((prev) => ({
            ...prev,
            inn: res % 11 === +innArr[innArr.length - 1],
        }));
        setRequiredInput((prev) => ({ ...prev, inn: true }));
    };
    //хэндлер тональности
    const handleChangeTonality = (index) => {
        setCurrentTonality((prev) => (prev = tonalityMock[index].title));
        setFormData((prev) => ({ ...prev, tonality: tonalityMock[index].value }));
        setShowTonality(!showTonality);
    };
    //хэндлер количества документов
    const handleChangeCountDocs = (value) => {
        setFormData((prev) => ({ ...prev, countDocs: value }));
    };
    //валидация количества документов
    const checkCountDocs = () => {
        if (!formData.countDocs) {
            setRequiredInput((prev) => ({ ...prev, countDocs: false }));
            setErrorsForm((prev) => ({ ...prev, countDocs: true }));
            return;
        }
        if (+formData.countDocs > 1000) {
            setRequiredInput((prev) => ({ ...prev, countDocs: true }));
            setErrorsForm((prev) => ({ ...prev, countDocs: false }));
            return;
        }
        setRequiredInput((prev) => ({ ...prev, countDocs: true }));
        setErrorsForm((prev) => ({ ...prev, countDocs: true }));
    };
    //хэндлер даты
    const handleChangeDateValue = (e) => {
        setFormData((prev) => ({
            ...prev,
            dateSearch: { ...prev.dateSearch, [e.target.name]: e.target.value },
        }));
    };
    //валидация даты
    const checkDate = () => {
        if (!formData.dateSearch.from || !formData.dateSearch.to) {
            setRequiredInput((prev) => ({
                ...prev,
                from: false,
                to: false,
            }));
            setErrorsForm((prev) => ({
                ...prev,
                from: true,
                to: true,
            }));
            return;
        }
        if (formData.dateSearch.from > formData.dateSearch.to) {
            setRequiredInput((prev) => ({
                ...prev,
                to: true,
                from: true,
            }));
            setErrorsForm((prev) => ({
                ...prev,
                from: false,
                to: false,
            }));
            return;
        }
        setRequiredInput((prev) => ({
            ...prev,
            from: true,
            to: true,
        }));
        setErrorsForm((prev) => ({
            ...prev,
            from: true,
            to: true,
        }));
    };
    //хэндлер чекбоксов
    const handleChangeCheckbox = (e) => {
        setFormData((prev) => ({
            ...prev,
            searchParams: { ...prev.searchParams, [e.target.id]: e.target.checked },
        }));
    };
    //обработчик клика по кнопке формы
    const onClickBtnForm = (e) => {
        e.preventDefault();
        dispatch(getHistograms(token, formData));
        dispatch(getPublications(token, formData));
        goToResultPage();
    };

    return (
        <form className={styles.searchForm}>
            <div className={styles.leftWrapper}>
                {/* ИНН */}
                <div className={styles.innCompany}>
                    <label htmlFor="inn">
                        ИНН компании
                        <span
                            className={
                                errorsForm.inn === false || requiredInput.inn === false
                                    ? styles.errorInputRequired
                                    : ''
                            }
                        >
                            *
                        </span>
                    </label>
                    <input
                        className={
                            errorsForm.inn === false || requiredInput.inn === false
                                ? styles.errorInput
                                : ''
                        }
                        value={formData.inn}
                        onChange={(e) => handleChangeInn(e.target.value)}
                        onBlur={checkСorrectInn}
                        type="text"
                        placeholder="10 цифр"
                        id="inn"
                    />
                    {requiredInput.inn === false && (
                        <div className={styles.requiredInputMessage}>
                            Обязательное поле
                        </div>
                    )}
                    {errorsForm.inn === false && (
                        <div className={styles.errorInputMessage}>
                            Введите корректные данные
                        </div>
                    )}
                </div>

                {/* Тональность */}
                <div className={styles.tonalityWrapper}>
                    <p>Тональность</p>
                    <div
                        onClick={() => setShowTonality(!showTonality)}
                        className={styles.tonalityItems}
                    >
                        {currentTonality}
                        <img
                            style={showTonality ? { transform: 'rotate(180deg)' } : {}}
                            src={arrowInput}
                            alt="arrow"
                        />
                    </div>
                    {showTonality && (
                        <div className={styles.tonalityPopup}>
                            <ul>
                                {tonalityMock.map(({ title }, index) => (
                                    <li
                                        key={title}
                                        onClick={() => handleChangeTonality(index)}
                                    >
                                        {title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* количество документов */}
                <div className={styles.count}>
                    <label htmlFor="count">
                        Количество документов в выдаче
                        <span
                            className={
                                errorsForm.countDocs === false ||
                                requiredInput.countDocs === false
                                    ? styles.errorInputRequired
                                    : ''
                            }
                        >
                            *
                        </span>
                    </label>
                    <input
                        value={formData.countDocs}
                        className={
                            errorsForm.countDocs === false ||
                            requiredInput.countDocs === false
                                ? styles.errorInput
                                : ''
                        }
                        onChange={(e) => handleChangeCountDocs(e.target.value)}
                        onBlur={checkCountDocs}
                        type="number"
                        placeholder="От 1 до 1000"
                        id="count"
                    />
                    {requiredInput.countDocs === false && (
                        <div className={styles.requiredInputMessage}>
                            Обязательное поле
                        </div>
                    )}
                    {errorsForm.countDocs === false && (
                        <div className={styles.errorInputMessage}>
                            Введите корректные данные
                        </div>
                    )}
                </div>

                {/* диапазон */}
                <div className={styles.calendarWrapper}>
                    <label>
                        Диапазон поиска
                        <span
                            className={
                                errorsForm.from === false ||
                                errorsForm.to === false ||
                                requiredInput.from === false ||
                                requiredInput.to === false
                                    ? styles.errorInputRequired
                                    : ''
                            }
                        >
                            *
                        </span>
                    </label>
                    <div className={styles.dateWrapper}>
                        <div ref={inputRef} className={styles.block}>
                            <input
                                className={
                                    errorsForm.from === false ||
                                    requiredInput.from === false
                                        ? styles.errorInput
                                        : ''
                                }
                                value={formData.dateSearch.from}
                                onChange={(e) => handleChangeDateValue(e)}
                                onBlur={checkDate}
                                max={new Date().toISOString().slice(0, 10)}
                                onFocus={() => setShowCalendar(!showCalendar)}
                                name="from"
                                type="date"
                            />
                            <img
                                className={showCalendar ? styles.rotate : ''}
                                src={arrowInput}
                                alt="arrow"
                            />
                        </div>

                        <div ref={inputRef2} className={styles.block}>
                            <input
                                className={
                                    errorsForm.to === false || requiredInput.to === false
                                        ? styles.errorInput
                                        : ''
                                }
                                value={formData.dateSearch.to}
                                onChange={(e) => handleChangeDateValue(e)}
                                onBlur={checkDate}
                                max={new Date().toISOString().slice(0, 10)}
                                onFocus={() => setShowCalendar2(!showCalendar2)}
                                name="to"
                                type="date"
                            />
                            <img
                                className={showCalendar2 ? styles.rotate : ''}
                                src={arrowInput}
                                alt="arrow"
                            />
                        </div>
                        {(requiredInput.from === false || requiredInput.to === false) && (
                            <div className={styles.requiredInputMessage}>
                                Обязательное поле
                            </div>
                        )}
                        {(errorsForm.from === false || errorsForm.to === false) && (
                            <div className={styles.errorInputMessage}>
                                Введите корректные данные
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.rightWrapper}>
                <div className={styles.checkBoxWrapper}>
                    {checkBoxLabel.map(({ label, value }) => (
                        <div key={label} className={styles.checkBox}>
                            <input
                                id={value ? value : label}
                                checked={formData.searchParams[value]}
                                onChange={(e) => handleChangeCheckbox(e)}
                                className={styles.customCheckbox}
                                type="checkbox"
                                disabled={value ? false : true}
                                style={!value ? { cursor: 'not-allowed' } : {}}
                            />
                            <label
                                style={!value ? { cursor: 'not-allowed' } : {}}
                                htmlFor={value ? value : label}
                            >
                                {label}
                            </label>
                        </div>
                    ))}
                </div>
                <div className={styles.buttonWrapper}>
                    <Button
                        disabled={disabledBtn}
                        onClick={onClickBtnForm}
                        styles={`${styles.searchBtn} ${
                            disabledBtn ? styles.disabled : ''
                        }`}
                    >
                        Поиск
                    </Button>
                    <div>
                        <span>* Обязательные к заполнению поля</span>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SearchForm;
