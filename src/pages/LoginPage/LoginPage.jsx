import { useEffect, useState } from 'react';
import styles from './LoginPage.module.scss';
import image from '../../assets/img/loginPage/image.png';
import loader from '../../assets/img/preloader/loader.svg';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginPage() {
    const { isAuth, status, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/';
    const [showCatchErr, setShowCatchErr] = useState(false);

    useEffect(() => {
        if (isAuth) navigate(fromPage, { replace: true });
    }, [isAuth, navigate, fromPage]);

    useEffect(() => {
        if (status === 'error-catch') {
            setShowCatchErr(true);
        }
    }, [status]);

    return (
        <section className={styles.loginSection}>
            <div className={styles.titleWrapper}>
                <h2>Для оформления подписки на тариф, необходимо авторизоваться.</h2>
                <div>
                    <img src={image} alt="titleImage" />
                </div>
            </div>
            <LoginForm />
            {status === 'loading' && (
                <div className={styles.loader}>
                    <div className={styles.loader__img_wrapper}>
                        <img className={styles.loader__img} src={loader} alt="loader" />
                    </div>
                </div>
            )}
            <div className={styles.show500}>
                <img src={image} alt="titleImage" />
            </div>
        </section>
    );
}

export default LoginPage;
