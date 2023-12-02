import { useEffect, useState } from "react";
import { useGetOneQuery } from "../../redux/plan/plan.query";
import { MyError } from "../../assets/types/main";

export const useGetPlan = (planId: any) => {
   const { data, error, isLoading, refetch }: any = useGetOneQuery(planId, { skip: !planId, refetchOnFocus: true });
   const [errorMessage, setErrorMessage] = useState<string>("");
   const [planDetails, setPlanDetails] = useState<any>({});
   const [upcomingTask, setUpcomingTask] = useState<any>(null);
   const [weeks, setWeeks] = useState<any>(null);

   useEffect(() => {
      if (error && 'data' in error && error.data) {
         const errorData = error.data as MyError;
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

   const Delete = (id: string) => {

      setWeeks((prevWeeks: any) =>
         prevWeeks?.map((week: any) => ({
            ...week,
            days: week?.days?.map((day: any) => ({
               ...day,
               task: day?.task?.id === id ? null : day?.task,
            })).filter((day: any) => day?.task !== null),
         })).filter((week: any) => week?.days?.length > 0)
      );

      setPlanDetails((prevPlanDetails: any) => {
         const { completedTasks = 0, totalTasks = 0, ...rest } = prevPlanDetails;
         const updatedCompletedTasks = Math.max(completedTasks - 1, 0);
         const updatedTotalTasks = Math.max(totalTasks - 1, 0);

         return {
            ...rest,
            completedTasks: updatedCompletedTasks,
            totalTasks: updatedTotalTasks
         };
      });

      SetUncomingTask(id);
   };

   const SetUncomingTask = (id: string) => {
      setUpcomingTask((prevUpcomingTask: any) => {
         if (prevUpcomingTask?.task?.id === id) {
            return setUpcomingTask(null);
         }
         return prevUpcomingTask;
      });
   }

   const Complete = (id: string) => {
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

      SetUncomingTask(id);
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
