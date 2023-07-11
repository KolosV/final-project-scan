import { useState } from 'react';
import Button from '../UI/Button/Button';
import googleImg from '../../assets/img/form/google.svg';
import faceBookImg from '../../assets/img/form/facebook.svg';
import yandexImg from '../../assets/img/form/yandex.svg';
import keyLockImg from '../../assets/img/form/keylock.svg';

import styles from './LoginForm.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { checkUserAuth } from '../../store/authorization/authorization-actions';

function LoginForm() {
    const dispatch = useDispatch();
    const { error, status } = useSelector((state) => state.auth);
    const [inputValue, setInputValue] = useState({
        login: 'sf_student10',
        password: 'KHKfTXb',
    });

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(checkUserAuth(inputValue));
    };

    return (
        <div className={styles.formWrapper}>
            <form className={styles.form}>
                <img className={styles.keyLock} src={keyLockImg} alt="keylock" />
                <div className={styles.btnWrapper}>
                    <button disabled className={styles.login}>
                        Войти
                    </button>
                    <button disabled className={styles.register}>
                        Зарегистрироваться
                    </button>
                </div>

                <div className={styles.inputWrapper}>
                    <div className={styles.loginInput}>
                        <label htmlFor="login">Логин или номер телефона:</label>
                        <input
                            className={status === 'error' ? styles.error : {}}
                            onChange={(e) =>
                                setInputValue((prev) => ({
                                    ...prev,
                                    login: e.target.value,
                                }))
                            }
                            value={inputValue.login}
                            id="login"
                        />
                    </div>
                    <div className={styles.passwordInput}>
                        <label htmlFor="password">Логин или номер телефона:</label>
                        <input
                            className={status === 'error' ? styles.error : {}}
                            onChange={(e) =>
                                setInputValue((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                }))
                            }
                            value={inputValue.password}
                            type="password"
                            id="password"
                        />
                    </div>
                    {status === 'error' && (
                        <div className={styles.errorWrapper}>
                            <p className={styles.errorMessage}>{error}</p>
                        </div>
                    )}
                </div>
                <Button
                    onClick={submitForm}
                    styles={`${styles.submit} ${
                        inputValue.login === '' || inputValue.password === ''
                            ? styles.disabled
                            : ''
                    }`}
                    disabled={inputValue.login === '' || inputValue.password === ''}
                >
                    Войти
                </Button>
                <div className={styles.recoverPassword}>
                    <p>Восстановить пароль</p>
                </div>
                <div className={styles.entryOptions}>
                    <p>Войти через:</p>
                    <div>
                        <img src={googleImg} alt="google" />
                        <img src={faceBookImg} alt="facebook" />
                        <img src={yandexImg} alt="yandex" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
