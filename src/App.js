import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MobileNav from './components/MobileNav/MobileNav';
import RequireAuth from './hoc/RequireAuth';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage';
import SearchResult from './pages/SearchResult/SearchResult';
import { localAuth } from './store/authorization/authorization-actions';

function App() {
    // const dispatch = useDispatch();
    // const { token, timeOfDeathToken, isAuth } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     localStorage.setItem('token', JSON.stringify(token));
    //     localStorage.setItem('token-time', JSON.stringify(timeOfDeathToken));
    //     if (token && timeOfDeathToken) {
    //         dispatch(localAuth());
    //     }
    // }, []);

    return (
        <>
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/search"
                        element={
                            <RequireAuth>
                                <SearchPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/result-search"
                        element={
                            <RequireAuth>
                                <SearchResult />
                            </RequireAuth>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;
