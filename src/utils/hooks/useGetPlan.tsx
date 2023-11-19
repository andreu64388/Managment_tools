import { useEffect, useState } from "react";
import { useGetOneQuery } from "../../redux/plan/plan.query";
import { MyError } from "../../assets/types/main";


export const useGetPlan = (planId: any) => {
   const { data, error, isLoading, refetch }: any = useGetOneQuery(planId, { skip: !planId, refetchOnFocus: true });
   const [errorMessage, setErrorMessage] = useState<string>("");
   const [planDetails, setPlanDetails] = useState<any>(null);
   const [upcomingTask, setUpcomingTask] = useState<any>(null);
   const [weeks, setWeeks] = useState<any>(null);

   useEffect(() => {
      refetch();
   }, []);

   useEffect(() => {

      if (error && 'data' in error && error.data) {
         const errorData = error.data as MyError;
         console.log(errorData)
         setErrorMessage(errorData?.message);

      }
   }, [error]);

   useEffect(() => {
      if (data) {
         const {
            completedTasks,
            daysLeft,
            deadline,
            planId,
            startDate,
            title,
            totalDays,
            totalTasks,
            upcomingTask,
            weeks,
         } = data;


         setPlanDetails({
            completedTasks,
            daysLeft,
            deadline,
            planId,
            startDate,
            title,
            totalDays,
            totalTasks,
         });

         setUpcomingTask(upcomingTask);
         setWeeks(weeks);

      }
   }, [data]);


   const Delete = (id: number) => {
      setWeeks((prevWeeks: any) =>
         prevWeeks?.map((week: any) => ({
            ...week,
            days: week?.days?.map((day: any) => ({
               ...day,
               task: day?.task?.id === id ? null : day?.task,
            })).filter((day: any) => day?.task !== null),
         })).filter((week: any) => week?.days?.length > 0)
      );
      setPlanDetails((prevPlanDetails: any) => ({
         ...prevPlanDetails,
         completedTasks: prevPlanDetails?.completedTasks - 1,
         totalTasks: prevPlanDetails?.totalTasks - 1,
      }));

      SetUncomingTask(id)
   };

   const SetUncomingTask = (id: number) => {
      setUpcomingTask((prevUpcomingTask: any) => {
         if (prevUpcomingTask?.task?.id === id) {
            return setUpcomingTask(null);
         }
         return prevUpcomingTask;
      });
   }


   const Complete = (id: number) => {
      setWeeks((prevWeeks: any) =>
         prevWeeks?.map((week: any) => ({
            ...week,
            days: week?.days?.map((day: any) => ({
               ...day,
               task: day?.task?.id === id ? { ...day?.task, completed: true } : day?.task,
            })),
         }))
      );


      setPlanDetails((prevPlanDetails: any) => ({
         ...prevPlanDetails,
         completedTasks: prevPlanDetails?.completedTasks + 1,
         totalTasks: prevPlanDetails?.totalTasks - 1,
      }));

      SetUncomingTask(id)
   };

   return {
      planDetails,
      upcomingTask,
      weeks,
      Delete,
      refetch,
      Complete,
      isLoading,
      errorMessage
   };
};
