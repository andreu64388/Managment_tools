import { useEffect, useState } from "react";
import { useForgotResetQuery } from "../../redux/forgot/forgot.query";


interface MyError {
   message: string;
}

export const useTokenValid = (token: string) => {
   const [errorMessage, SetErrorMessage] = useState<string>("");
   const [isValid, setIsValid] = useState<boolean>(false);
   const { data, error, isLoading } = useForgotResetQuery(token, { skip: !token, refetchOnFocus: false });

   useEffect(() => {
      try {
         if (data) {
            setIsValid(true);
         }

      } catch (error) {
         SetErrorMessage('An unexpected error occurred');
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


   return { errorMessage, isValid, isLoading, setIsValid };
};
