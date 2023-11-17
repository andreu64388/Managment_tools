import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/auth/auth.query";
import { useAppDispatch } from "../../redux/store";
import { setUser } from "../../redux/auth/auth.slice";
import { setAuthToken } from "../localStorage";
import { useNavigate } from "react-router-dom";
import { MyError } from "../../assets/types/main";




enum ROLES {
  USER = 'user',
  ADMIN = 'admin'
}


function useRegistration() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register, { data, error, isLoading }] = useRegisterMutation();
  const [errorMessage, SetErrorMessage] = useState<string>("")

  useEffect(() => {
    if (data) {
      try {
        console.log(data);
        setAuthToken(data?.token);
        dispatch(setUser(data?.user));
        if (data.user.roles.some((role: any) => role.name === ROLES.USER)) {
          navigate("/");
        }
        else { navigate("/admin"); }
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


      await register(credentials);
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


export default useRegistration;