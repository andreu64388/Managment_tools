
import { useEffect, useState } from "react";
import { useDeletePlanMutation, } from "../../redux/plan/plan.query";
import { MyError } from "../../assets/types/main";

export const usePlanDelete = () => {

   const [del, { data, error, isLoading }] = useDeletePlanMutation();
   const [errorMessage, SetErrorMessage] = useState<string>("")

   useEffect(() => {
      if (error) {
         if ('data' in error && error.data) {
            const errorData = error.data as MyError;
            SetErrorMessage(errorData?.message);
         }
      }
   }, [error]);

   const handleSubmitPlan = async (planId: number) => {
      try {
         const { data }: any = await del(planId);
         return data;

      } catch (error) {
         SetErrorMessage('An unexpected error occurred');
      }
   };

   return {
      handleSubmitPlan,
      isLoading
   };
}


