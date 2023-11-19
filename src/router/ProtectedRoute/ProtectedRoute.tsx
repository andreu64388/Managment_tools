import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from "../../redux/auth/auth.slice";
import { ROLES } from '../../assets/enum/role.enum';

const ProtectedRoute = ({ children, redirectTo = '/login', }: any) => {
    const user = useSelector(selectUser);

    if (user && user.roles.some((role: any) => role.name === ROLES.USER)) {
        return children;
    } else {
        return <Navigate to={redirectTo} />;
    }
};

export default ProtectedRoute;
