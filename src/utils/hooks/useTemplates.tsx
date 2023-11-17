import { useEffect, useState } from "react";
import { useGetAllQuery } from "../../redux/template/template.query";

interface TemplateParams {
   offset: number;
   limit: number;
}

export const useTemplates = (params: TemplateParams) => {
   const { data, error, isLoading, refetch } = useGetAllQuery(params);
   const [errorMessage, setErrorMessage] = useState<string>("");
   const [templates, setTemplates] = useState<any[]>([]);
   const [isDataAll, setIsDataAll] = useState<boolean>(true);


   useEffect(() => {
      if (error) {
         setErrorMessage("An unexpected error occurred");
      }
   }, [error]);
   useEffect(() => {
      if (data) {


         if (data.length === 0 || data.length < params.limit) {
            setIsDataAll(false);
         }

         setTemplates((prevTemplates) => [...prevTemplates, ...data]);
      }
   }, [data]);

   useEffect(() => {
      if (params)
         refetch()
   }, [params]);

   return { errorMessage, setErrorMessage, isLoading, isDataAll, templates, refetch };
};
