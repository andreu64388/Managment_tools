import { useEffect, useState } from "react";
import { useGetTaskQuery } from "../../redux/plan/plan.query";
import { MyError } from "../../assets/types/main";




export const useGetTask = (obj: any) => {

   const { data, error, isLoading, refetch } = useGetTaskQuery(obj, {
      skip: !obj,

   });
   const [getErrorTask, SetErrorMessage] = useState<string>("")
   const [task, setTask] = useState<any>({});

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

         setTask(data);
      }
   }, [data]);



   const Complete = () => {
      setTask((prev: any) => {
         return {
            ...prev,
            task: {
               ...prev.task,
               completed: true
            }
         }
      })
   }

   return { getErrorTask, isLoading, task, refetch, Complete };

}