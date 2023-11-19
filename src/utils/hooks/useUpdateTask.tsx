
import { useEffect, useState } from "react";
import { MyError } from "../../assets/types/main";
import { useUpdateTaskMutation } from "../../redux/task/task.query";


export const useUpdateTask = () => {

   const [update, { data, error, isLoading }] = useUpdateTaskMutation();
   const [errorMessage, SetErrorMessage] = useState<string>("")


   useEffect(() => {
      if (error) {
         if ('data' in error && error.data) {
            const errorData = error.data as MyError;
            SetErrorMessage(errorData?.message);
         }
      }
   }, [error]);

   const handleUpdate = async (obj: any) => {
      try {
         const { data }: any = await update(obj);
         console.log(data)
         return data
      } catch (error) {
         SetErrorMessage('An unexpected error occurred');

      }
   };

   return {
      handleUpdate, isLoading
   };
}


