
import { useEffect, useState } from "react";
import { MyError } from "../../assets/types/main";
import { useDeleteMutation } from "../../redux/task/task.query";


export const useDeleteTask = () => {

   const [del, { data, error, isLoading }] = useDeleteMutation();
   const [errorMessage, SetErrorMessage] = useState<string>("")


   useEffect(() => {
      if (error) {
         if ('data' in error && error.data) {
            const errorData = error.data as MyError;
            SetErrorMessage(errorData?.message);
         }
      }
   }, [error]);



   const handleDeletTask = async (id: number) => {
      try {
         const data = await del(id);
         alert(data)
         console.log(data)
         return true;

      } catch (error) {
         SetErrorMessage('An unexpected error occurred');
         return false;
      }
   };

   return {
      handleDeletTask,
   };
}


