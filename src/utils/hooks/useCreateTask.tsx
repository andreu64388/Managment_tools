import axios from "../../api/index";
import { useState } from 'react';

export const useCreateTask = () => {
   const [errorMessage, setErrorMessage] = useState<string>("");
   const [isLoading, setIsLoading] = useState<boolean>(false);


   const handleCreate = async (dataDto: any) => {
      try {
         setIsLoading(true);

         const response = await axios.post("/tasks", dataDto);

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
      handleCreate,
   };
};
