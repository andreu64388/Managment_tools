import {FC} from "react";
//@ts-ignore
import styles from "./Step.module.scss";

interface StepProps {
    step: number;
}

export const Step: FC<StepProps> = ({step}) => {
    return (
        <div>
            <div className={styles.step}>
                <div className={styles.up}>
                    <h1 className={styles.title}>Pick Your Template</h1>
                    <div className={styles.step_number}>
                        Step {step}<span>/ {2}</span>
                    </div>
                </div>
                <div className={styles.description}>
                    Choose your campaign type from the proven plug-and-play templates below
                </div>
            </div>
            <div className={styles.lineWrapper}>
                <div className={styles.line} style={{width: `${(step / 2) * 100}%`}}></div>
            </div>
        </div>
    );
};
