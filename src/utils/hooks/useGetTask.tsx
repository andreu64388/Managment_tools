import { useEffect, useState } from "react";
import { useGetTaskQuery } from "../../redux/plan/plan.query";
import { MyError } from "../../assets/types/main";




export const useGetTask = (obj: any) => {

   const { data, error, isLoading, refetch } = useGetTaskQuery(obj);
   const [getErrorTask, SetErrorMessage] = useState<string>("")

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
         console.log(data)
      }
   }, [data]);


   return { getErrorTask, isLoading, data, refetch };

}