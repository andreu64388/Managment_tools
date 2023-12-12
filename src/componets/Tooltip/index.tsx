import { FC, memo } from "react";
//@ts-ignore
import styles from "./Tooltip.module.scss"

const Tooltip: FC = () => {
    return (
        <div className={styles.tooltipContainer}>
            <span className={styles.tooltipTrigger}>Why can’t I select an earlier date?</span>
            <div className={styles.tooltipText}>You cannot select an earlier date because you need at least as much time as the earliest date shown in order to complete the necessary steps to have a successful launch.
            </div>
        </div>
    );
};


export default memo(Tooltip)