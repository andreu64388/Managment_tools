import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckIsAuth } from "../../redux/auth/auth.slice";

const ProtectedRoute = ({ children, redirectTo = '/login', }: any) => {
    const isAuth = useSelector(CheckIsAuth);
    if (isAuth) {
        return children;
    } else {
        return <Navigate to={redirectTo} />;
    }
};

export default ProtectedRoute;
