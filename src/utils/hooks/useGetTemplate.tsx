import { useEffect, useState } from "react";
import { MyError } from "../../assets/types/main";
import { useGetOneQuery } from "../../redux/template/template.query";


export const useGetTemplate = (id: any) => {
   const { data, error, isLoading, refetch }: any = useGetOneQuery(id, { skip: !id });
   alert(id)
   const [errorMessage, SetErrorMessage] = useState<string>("")
   const [templateValue, setTemplateValue] = useState<any>({})


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
         setTemplateValue(data);
      }
   }, [data]);


   return { errorMessage, SetErrorMessage, isLoading, setTemplateValue, templateValue, refetch };

}