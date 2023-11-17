import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMutation } from "../../redux/plan/plan.query";

interface MyError {
   message: string;
}

export const useCreatePlan = () => {
   const navigate = useNavigate();
   const [create, { data, error, isLoading }] = useCreateMutation();
   const [errorMessage, SetErrorMessage] = useState<string>("")


   useEffect(() => {
      if (data) {
         try {
            navigate("/details/" + data?.id);
         }
         catch (error) {
            SetErrorMessage('An unexpected error occurred');
         }
      }
   }, [data]);

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
         await create(obj);
      } catch (error) {
         SetErrorMessage('An unexpected error occurred');
      }
   };

   return {
      SetErrorMessage,
      errorMessage,
      isLoading,
      handleSubmit,
      error
   };
}     