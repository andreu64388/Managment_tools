import { useEffect, useState } from "react";
import { useGetAllQuery } from "../../redux/template/template.query";

interface TemplateParams {
   offset: number;
   limit: number;
}

export const useTemplates = (params: TemplateParams) => {
   const { data, error, isLoading, refetch }: any = useGetAllQuery(params, {
      skip: !params,
      refetchOnFocus: true,
   });

   const [loadingMore, setLoadingMore] = useState<boolean>(false);
   const [errorMessage, setErrorMessage] = useState<string>("");
   const [templates, setTemplates] = useState<any[]>([]);
   const [isDataAll, setIsDataAll] = useState<boolean>(true);

   useEffect(() => {
      refetch()
   }, [])

   useEffect(() => {
      if (error) {
         setErrorMessage("An unexpected error occurred");
      }
   }, [error]);


   useEffect(() => {
      if (data) {
         if (data?.length === 0 || data?.length < params.limit) {
            setIsDataAll(false);
         }
         const filteredData = data.filter((newTemplate: any) => !templates.some(existingTemplate => existingTemplate.id === newTemplate.id));
         setTemplates((prevTemplates) => [...prevTemplates, ...filteredData]);
         setLoadingMore(false)
      }
   }, [data]);


   const LoadMore = () => {
      setLoadingMore(true);
      refetch();
   };

   const CreateTemplate = (obj: any) => {

      if (obj && !isDataAll) {
         setTemplates((prevTemplates) => [...prevTemplates, obj]);
      }
   }

   return { errorMessage, setErrorMessage, isLoading, isDataAll, templates, refetch, CreateTemplate, loadingMore, LoadMore };
};
