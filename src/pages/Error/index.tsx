import { FC } from "react";
import usePageSettings from "../../utils/hooks/usePageSettings";

export const ErrorPage: FC = () => {
    usePageSettings('Error');
    return (
        <div>
            <h1>Error</h1>
        </div>
    );
};