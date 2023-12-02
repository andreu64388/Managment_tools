import axios from "../../api/index";
import { useState } from 'react';

export const useUpdateTask = () => {
   const [errorMessage, setErrorMessage] = useState<string>("");
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const handleUpdate = async (dataDto: any) => {
      try {

         setIsLoading(true);
         const response = await axios.put("/tasks", dataDto);

         setIsLoading(false);

         return response.data;
      } catch (error) {

         setIsLoading(false);
         setErrorMessage('An unexpected error occurred');
      }
   };

   return {
      errorMessage,
      isLoading,
      handleUpdate,
   };
};
