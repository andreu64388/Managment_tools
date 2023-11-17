import { Outlet } from "react-router-dom";
import { FC } from "react";
import "./assets/styles/fonts.css";
import { useGetProfile } from "./utils/hooks/useGetProfile";
import { Loading, LoadingApp } from "./componets";

export const App: FC = () => {

    const loading: boolean = useGetProfile();

    if (loading) return <LoadingApp />;

    return <Outlet />


};