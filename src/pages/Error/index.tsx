import { FC } from "react";
import usePageSettings from "../../utils/hooks/usePageSettings";
//@ts-ignore 
import styles from "./Error.module.scss";
import { Link } from "react-router-dom";


const ErrorPage: FC = () => {
    usePageSettings('Error');
    return (
        <div className={styles.errorContainer}>
            <h1>
                The page not found
            </h1>
            <Link to={"/"} className={styles.homeButton}>Home</Link>
        </div>
    )
};

export default ErrorPage;