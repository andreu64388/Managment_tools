import { useEffect, useState } from "react";
import { useGetOneQuery } from "../../redux/plan/plan.query";
import { MyError } from "../../assets/types/main";


export const useGetPlan = (planId: number) => {
   const { data, error, isLoading, refetch } = useGetOneQuery(planId, { skip: !planId });
   const [errorMessage, SetErrorMessage] = useState<string>("")
   const [plan, setPlan] = useState<any[]>([]);

   useEffect(() => {
      if (error) {
         if ('data' in error && error.data) {
            const errorData = error.data as MyError;
            SetErrorMessage(errorData?.message);
         }

      }
   }, [error]);

   useEffect(() => {
      if (data) {
         setPlan(data)
      }
   }, [data]);

   return { errorMessage, SetErrorMessage, isLoading, plan, refetch, setPlan };

}