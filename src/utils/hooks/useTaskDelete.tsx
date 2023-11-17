import { useEffect, useState } from "react";
import { useDeleteTaskMutation } from "../../redux/plan/plan.query";


interface MyError {
   message: string;

}

export const useTaskDelete = () => {

   const [del, { data, error, isLoading }] = useDeleteTaskMutation();
   const [errorMessage, SetErrorMessage] = useState<string>("")

   useEffect(() => {
      if (error) {
         if ('data' in error && error.data) {
            const errorData = error.data as MyError;
            SetErrorMessage(errorData?.message);
         }
      }
   }, [error]);

   const handleSubmitDelete = async (obj: any) => {
      try {


         await del(obj);
         return true;

      } catch (error) {
         SetErrorMessage('An unexpected error occurred');
         return false;
      }
   };

   return {
      handleSubmitDelete,
   };
}


