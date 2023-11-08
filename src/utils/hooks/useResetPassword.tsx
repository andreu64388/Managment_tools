import { useEffect, useState } from "react";
import { useResetMutation } from "../../redux/forgot/forgot.query";
import { useNavigate } from "react-router-dom";


export const useResetPassword = () => {
   const navigate = useNavigate();
   const [reset, { data, isLoading }] = useResetMutation();

   const [errorMessage, SetErrorMessage] = useState<string>("");
   const [isLoadingSend, setIsLoadingSend] = useState<boolean>(false);

   useEffect(() => {
      setIsLoadingSend(isLoading);
   }, [isLoading]);

   useEffect(() => {
      try {
         if (data) {
            console.log(data);
            navigate("/login")
         }
      } catch (error) {
         SetErrorMessage('An unexpected error occurred');
      }
   }, [data]);


   const handleSubmit = async (transferData: any) => {
      try {
         await reset(transferData);
      } catch (error) {
         SetErrorMessage('An unexpected error occurred');
      }
   };

   return { errorMessage, SetErrorMessage, isLoadingSend, handleSubmit };
};
