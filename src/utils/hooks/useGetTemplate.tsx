import { useEffect, useState } from "react";
import { MyError } from "../../assets/types/main";
import { useGetOneQuery } from "../../redux/template/template.query";


export const useGetTemplate = (templateId: number) => {
   const { data, error, isLoading, refetch } = useGetOneQuery(templateId, { skip: !templateId });
   const [errorMessage, SetErrorMessage] = useState<string>("")
   const [template, setTemplate] = useState<any[]>([]);

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
         setTemplate(data)

      }
   }, [data]);

   return { errorMessage, SetErrorMessage, isLoading, template, refetch };

}