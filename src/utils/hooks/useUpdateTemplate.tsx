
import { useEffect, useState } from "react";
import { MyError } from "../../assets/types/main";
import { useUpdateMutation } from "../../redux/template/template.query";


export const useUpdateTemplate = () => {

   const [update, { data, error, isLoading }] = useUpdateMutation();
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
         return data;

      } catch (error) {
         SetErrorMessage('An unexpected error occurred');

      }
   };

   return {
      isLoading,
      handleUpdate,
   };
}


