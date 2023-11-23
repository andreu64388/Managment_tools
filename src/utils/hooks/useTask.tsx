import { useEffect, useState } from "react";
import { useUpdateMutation } from "../../redux/task/task.query";
import { MyError } from "../../assets/types/main";


export const useTask = () => {

   const [update, { data, error, isLoading }]: any = useUpdateMutation();
   const [errorMessage, SetErrorMessage] = useState<string>("")

   useEffect(() => {
      if (error && 'data' in error && error.data) {
         const errorData = error.data as MyError;
         SetErrorMessage(errorData?.message);
      }
   }, [error]);


   const handleSubmit = async (obj: any) => {
      try {
         const { data }: any = await update(obj);
         return data?.taskId;
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


