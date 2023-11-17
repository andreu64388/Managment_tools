import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { GetMe, selectLoading } from "../../redux/auth/auth.slice";

export const useGetProfile = () => {
   const dispatch = useAppDispatch();
   const loading = useAppSelector<any>(selectLoading)

   useEffect(() => {
      dispatch(GetMe())
   }, []);

   return loading;
}
