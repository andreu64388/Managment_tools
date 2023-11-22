import { useEffect, useState } from "react";
import { MyError } from "../../assets/types/main";
import { useGetTasksTemplatesQuery } from "../../redux/template/template.query";

export const useGetTasks = (params: any) => {

   const { data, error, isLoading, refetch } = useGetTasksTemplatesQuery(params, {
      skip: !params,
      refetchOnMountOrArgChange: true
   });
   const [loadingMore, setLoadingMore] = useState<boolean>(false);
   const [errorMessage, SetErrorMessage] = useState<string>("")
   const [tasks, setTasks] = useState<any>([]);
   const [isDataAll, setIsDataAll] = useState<boolean>(true);


   useEffect(() => {
      if (error && 'data' in error && error.data) {
         const errorData = error.data as MyError;
         alert("Work")
         console.log(errorData)
         SetErrorMessage(errorData?.message);
      }
   }, [error]);

   useEffect(() => {
      alert("Work")
      console.log(data)
      if (!data) return;

      if (data?.length === 0 || data?.length < params.limit) {
         setIsDataAll(false);
      }

      const filteredData = data.filter((newTask: any) => !tasks.some((existingTask: any) => existingTask.id === newTask.id));
      setTasks((prevTemplates: any) => [...prevTemplates, ...filteredData]);
      setLoadingMore(false)

   }, [data]);


   const AddTask = (obj: any) => {
      if (obj && !isDataAll) {
         setTasks((prevTemplates: any) => [...prevTemplates, obj]);
      }
   }

   const DeleteTask = (id: number) => {
      setTasks(tasks?.filter((task: any) => task.id !== id));
   }

   const UpdateTask = (obj: any) => {
      setTasks(tasks?.map((task: any) => task.id === obj.id ? obj : task));
   }
   const LoadMore = () => {
      setLoadingMore(true);
      refetch();
   };


   return { errorMessage, isLoading, tasks, refetch, isDataAll, AddTask, DeleteTask, UpdateTask, loadingMore, LoadMore };

}