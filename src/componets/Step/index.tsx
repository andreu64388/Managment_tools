import { FC } from "react";
//@ts-ignore
import styles from "./Step.module.scss";
import { arrStep } from "../../assets/data/data";

interface StepProps {
    step: number;
}

export const Step: FC<StepProps> = ({ step }) => {
    return (
        <div>
            <div className={styles.step}>
                <div className={styles.up}>
                    <h1 className={styles.title}>
                        {arrStep[step - 1].title}
                    </h1>
                    <div className={styles.step_number}>
                        Step {step}<span>/ {2}</span>
                    </div>
                </div>
                <div className={styles.description}>
                    {arrStep[step - 1].description}
                </div>
            </div>
            <div className={styles.lineWrapper}>
                <div className={styles.line} style={{ width: `${(step / 2) * 100}%` }}></div>
            </div>
        </div>
    );
};
