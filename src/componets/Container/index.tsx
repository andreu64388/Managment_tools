import { FC } from "react";
//@ts-ignore
import styles from "./Container.module.scss";

interface ContainerProps {
    children?: React.ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}