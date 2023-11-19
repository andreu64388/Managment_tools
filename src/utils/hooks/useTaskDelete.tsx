import { useEffect, useState } from "react";
import { useDeleteTaskMutation } from "../../redux/plan/plan.query";
import { MyError } from "../../assets/types/main";


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
         const { data }: any = await del(obj);
         return data

      } catch (error) {
         SetErrorMessage('An unexpected error occurred');
      }
   };

   return {
      handleSubmitDelete,
      isLoading
   };
}


