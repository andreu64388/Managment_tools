import { useEffect, useState } from "react";
import { useUpdateMutation } from "../../redux/task/task.query";


interface MyError {
   message: string;

}

export const useTask = () => {

   const [update, { data, error, isLoading }]: any = useUpdateMutation();
   const [errorMessage, SetErrorMessage] = useState<string>("")

   useEffect(() => {
      if (data) {
         try {

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

   const handleSubmit = async (obj: any) => {
      try {

         await update(obj);
         return true;
      } catch (error) {
         SetErrorMessage('An unexpected error occurred');
         return false;

      }
   };

   return {
      SetErrorMessage,
      errorMessage,
      isLoading,
      handleSubmit,

   };
}


