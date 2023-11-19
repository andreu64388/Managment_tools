import { useEffect, useState } from "react";
import { MyError } from "../../assets/types/main";
import { useGetAllUncompletedQuery } from "../../redux/plan/plan.query";

interface Params {
   offset: number;
   limit: number;
}

export const useGetUncompleted = (params: Params) => {
   const { data, error, isLoading, refetch } = useGetAllUncompletedQuery(params, { skip: !params, refetchOnFocus: true, });
   const [errorMessage, SetErrorMessage] = useState<string>("")
   const [plans, setPlans] = useState<any[]>([]);
   const [isDataAll, setIsDataAll] = useState<boolean>(true);
   const [loadingMore, setLoadingMore] = useState<boolean>(false);

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
         if (data.length === 0 || data.length < params.limit) {
            setIsDataAll(false);
         }
         setPlans((prevTemplates) => [...prevTemplates, ...filteredData]);
         setLoadingMore(false)
      }
   }, [data]);

   const Delete = (id: number) => {
      setPlans(plans?.filter(plan => plan.id !== id));
   }


   const LoadMore = () => {
      setLoadingMore(true);
      refetch();
   };

   return { plans, refetch, isDataAll, isLoading, Delete, loadingMore, LoadMore };
}