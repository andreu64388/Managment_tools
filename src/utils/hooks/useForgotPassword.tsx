import { useEffect, useState } from "react";
import { useForgotMutation } from "../../redux/forgot/forgot.query";

export const useForgotPassword = () => {
   const [errorMessage, SetErrorMessage] = useState<string>("");
   const [isDataAvailable, setIsDataAvailable] = useState<boolean>(true);
   const [forgot, { data, error, isLoading }] = useForgotMutation();

   useEffect(() => {
      try {
         if (data) {
            console.log(data);
            setIsDataAvailable(false);
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
   const handleSubmit = async (email: string) => {
      try {
         await forgot(email);
      } catch (error) {
         SetErrorMessage('An unexpected error occurred');
      }
   };

   return { errorMessage, SetErrorMessage, isDataAvailable, isLoading, handleSubmit, setIsDataAvailable };
};
