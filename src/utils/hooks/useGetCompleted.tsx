import { useEffect, useState } from "react";
import { MyError } from "../../assets/types/main";
import { useGetAllCompletedQuery } from "../../redux/plan/plan.query";


interface Params {
   offset: number;
   limit: number;
}

export const useGetCompleted = (params: Params) => {
   const { data, error, isLoading, refetch } = useGetAllCompletedQuery(params, { skip: !params, refetchOnFocus: true, });
   const [errorMessage, SetErrorMessage] = useState<string>("")
   const [plans, setPlans] = useState<any[]>([]);
   const [isDataAll, setIsDataAll] = useState<boolean>(true);

   useEffect(() => {
      refetch()
   }, [])

   useEffect(() => {
      if (error && 'data' in error && error.data) {
         const errorData = error.data as MyError;
         SetErrorMessage(errorData?.message);
      }
   }, [error]);

   useEffect(() => {
      if (data) {
         const filteredData = data.filter((newPlan: any) => !plans.some(existingPlan => existingPlan.id === newPlan.id));
         if (data?.length === 0 || data?.length < params.limit) {
            setIsDataAll(false);
         }
         setPlans((prev) => [...prev, ...filteredData]);
      }
   }, [data]);


   const Delete = (id: string) => {
      setPlans(plans?.filter(plan => plan.id !== id));
   }


   return { errorMessage, isLoading, plans, isDataAll, setPlans, Delete };

}