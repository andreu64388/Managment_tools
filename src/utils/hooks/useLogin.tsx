import { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/auth/auth.query";
import { useAppDispatch } from "../../redux/store";
import { setUser } from "../../redux/auth/auth.slice";
import { setAuthToken } from "../localStorage";
import { useNavigate } from "react-router-dom";
import { MyError } from "../../assets/types/main";




enum ROLES {
   USER = 'user',
   ADMIN = 'admin'
}

const useLogin = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const [login, { data, error, isLoading }] = useLoginMutation();
   const [errorMessage, SetErrorMessage] = useState<string>("")

   useEffect(() => {
      if (data) {
         try {
            setAuthToken(data?.token);
            dispatch(setUser(data?.user));

            if (data.user.roles.some((role: any) => role.name === ROLES.USER)) {
               navigate("/");
            }
            else {
               navigate("/admin");
            }
         }
         catch (error) {
            SetErrorMessage('An unexpected error occurred');
         }
      }
   }, [data]);

   useEffect(() => {
      if (error) {
         if ('data' in error && error.data) {
            const errorData = error.data as MyError;
            SetErrorMessage(errorData?.message);
         }
      }
   }, [error]);

   const handleSubmit = async ({ email, password }: any) => {
      try {
         const credentials: any = {
            email,
            password,
         };
         await login(credentials);
      } catch (error) {
         SetErrorMessage('An unexpected error occurred');
      }
   };

   return {
      SetErrorMessage,
      errorMessage,
      isLoading,
      handleSubmit,
   };
}


export default useLogin;