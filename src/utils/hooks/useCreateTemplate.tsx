
import { useEffect, useState } from "react";
import { MyError } from "../../assets/types/main";
import { useCreateMutation } from "../../redux/template/template.query";




export const useCreateTemplate = () => {

   const [create, { error, isLoading }] = useCreateMutation();
   const [errorMessage, SetErrorMessage] = useState<string>("")


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
         const { data }: any = await create(obj);

         return data

      } catch (error) {
         SetErrorMessage('An unexpected error occurred');

      }
   };

   return {
      errorMessage,
      error, isLoading,
      handleSubmit,
   };
}


