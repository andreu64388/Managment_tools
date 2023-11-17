import { useEffect, useState } from "react";
import { useGetAllQuery } from "../../redux/plan/plan.query";
import { MyError } from "../../assets/types/main";


export const useHome = () => {
   const { data, error, isLoading, refetch } = useGetAllQuery(undefined);
   const [errorMessage, SetErrorMessage] = useState<string>("")
   const [plans, setPlans] = useState<any[]>([]);
   const [planCompleted, setPlansCompleted] = useState<any[]>([])


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
         setPlans(data?.uncompletedPlans)
      } setPlansCompleted(data?.completedPlans)
   }, [data]);

   return { errorMessage, SetErrorMessage, isLoading, plans, planCompleted, refetch };

}