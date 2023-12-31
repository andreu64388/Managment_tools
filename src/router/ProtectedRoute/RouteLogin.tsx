import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from "../../redux/auth/auth.slice";
import { ROLES } from '../../assets/enum/role.enum';


const RouteLogin = ({ children }: any) => {
   const user: any = useSelector(selectUser);
   if (user) {
      const isUser = user.roles.some((role: any) => role.name === ROLES.USER);
      return <Navigate to={isUser ? "/" : "/admin"} />;
   }
   return children;
};

export default RouteLogin;


