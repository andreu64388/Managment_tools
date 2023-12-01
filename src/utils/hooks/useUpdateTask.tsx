import axios from "../../api/index";
import { useState } from 'react';

export const useUpdateTask = () => {
   const [errorMessage, setErrorMessage] = useState<string>("");
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [videoUploadProgress, setVideoUploadProgress] = useState<number>(0);

   const handleUpdate = async (dataDto: FormData) => {
      try {
         setIsLoading(true);

         const onUploadProgress = (progressEvent: any) => {
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setVideoUploadProgress(percentCompleted)
         }

         const config = {
            headers: {
               "Content-Type": "multipart/form-data",
            },
            onUploadProgress: onUploadProgress,
         };

         const response = await axios.put("/tasks", dataDto, config);

         setIsLoading(false);
         setVideoUploadProgress(0);
         return response.data;
      } catch (error) {
         console.error("Error:", error);
         setIsLoading(false);
         setVideoUploadProgress(0);
         setErrorMessage('An unexpected error occurred');
      }
   };

   return {
      errorMessage,
      isLoading,
      videoUploadProgress,
      handleUpdate,
   };
};
