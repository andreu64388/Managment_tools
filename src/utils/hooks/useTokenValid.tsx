import { useEffect, useState } from "react";
import { useForgotResetQuery } from "../../redux/forgot/forgot.query";

export const useTokenValid = (token: string) => {
   const [errorMessage, SetErrorMessage] = useState<string>("");
   const [isValid, setIsValid] = useState<boolean>(false);
   const { data, error, isLoading } = useForgotResetQuery(token);

   useEffect(() => {
      try {
         if (data) {
            console.log(data);
            setIsValid(true);
         }

      } catch (error) {
         SetErrorMessage('An unexpected error occurred');
      }
   }, [data]);

   useEffect(() => {
      if (error) {
         if ('data' in error && error.data) {
            SetErrorMessage(error?.data?.message);
         }
      }
   }, [error]);


   return { errorMessage, isValid, isLoading, setIsValid };
};
