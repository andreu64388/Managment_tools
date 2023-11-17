import { useEffect, useState } from "react";
import { useGetProfileQuery } from "../../redux/auth/auth.query";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/auth/auth.slice";
import { useAppDispatch } from "../../redux/store";
import { MyError } from "../../assets/types/main";


export function useRedirect(token?: string) {
   const { data, error, isLoading, } = useGetProfileQuery(token, { skip: !token });
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const [errorMessage, SetErrorMessage] = useState<string>("")

   useEffect(() => {
      if (error) {
         if ('data' in error && error.data) {
            const errorData = error.data as MyError;
            SetErrorMessage(errorData?.message);
            navigate("/login")
         }
      }
   }, [error]);

   useEffect(() => {
      if (data) {
         dispatch(setUser(data?.user));
         navigate("/")
      }
   }, [data]);

   return { errorMessage, SetErrorMessage, isLoading };

}
