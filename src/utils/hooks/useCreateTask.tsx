
import { useEffect, useState } from "react";
import { MyError } from "../../assets/types/main";
import { useCreateMutation } from "../../redux/task/task.query";

export const useCreateTask = () => {
   const [create, { data, error, isLoading }] = useCreateMutation();
   const [errorMessage, SetErrorMessage] = useState<string>("")


   useEffect(() => {
      if (error) {
         if ('data' in error && error.data) {
            const errorData = error.data as MyError;
            SetErrorMessage(errorData?.message);
         }
      }
   }, [error]);

   const handleCreate = async (obj: any) => {
      try {
         const { data }: any = await create(obj);
         console.log(data)
         return data;

      } catch (error) {
         SetErrorMessage('An unexpected error occurred');

      }
   };

   return {
      errorMessage,
      error, isLoading,
      handleCreate,
   };
}


