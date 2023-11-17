
import { useEffect, useState } from "react";
import { MyError } from "../../assets/types/main";
import { useDeleteMutation } from "../../redux/template/template.query";

export const useDeleteTemplate = () => {

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

   const handleDeletTemplate = async (id: number) => {
      try {
         alert(id)
         await del(id);
         return true;

      } catch (error) {
         SetErrorMessage('An unexpected error occurred');
         return false;
      }
   };

   return {
      handleDeletTemplate,
   };
}


