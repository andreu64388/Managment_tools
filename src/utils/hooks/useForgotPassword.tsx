import { useEffect, useState } from "react";
import { useForgotMutation } from "../../redux/forgot/forgot.query";
import { MyError } from "../../assets/types/main";


export const useForgotPassword = () => {
   const [errorMessage, SetErrorMessage] = useState<string>("");
   const [isDataAvailable, setIsDataAvailable] = useState<boolean>(true);
   const [forgot, { data, error, isLoading }] = useForgotMutation();

   useEffect(() => {
      try {
         if (data) {
            setIsDataAvailable(false);
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


   const handleSubmit = async (email: string) => {
      try {
         await forgot(email);
      } catch (error) {
         SetErrorMessage('An unexpected error occurred');
      }
   };

   return { errorMessage, SetErrorMessage, isDataAvailable, isLoading, handleSubmit, setIsDataAvailable };
};
