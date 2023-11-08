import { Outlet } from "react-router-dom";
import { FC } from "react";
import "./assets/styles/fonts.css";
import { useGetProfile } from "./utils/hooks/useGetProfile";

export const App: FC = () => {
    const loading = useGetProfile();

    if (loading) return <div>Loading...</div>;

    return <Outlet />


};