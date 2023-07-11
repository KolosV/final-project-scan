import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
    const location = useLocation();
    const { isAuth } = useSelector((state) => state.auth);
    
    if (!isAuth) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}

export default RequireAuth;
