import { FC } from "react";
//@ts-ignore
import styles from "./Tooltip.module.scss"

export const Tooltip: FC = () => {
    return (
        <div className={styles.tooltipContainer}>
            <span className={styles.tooltipTrigger}>Why can’t I select an earlier date?</span>
            <div className={styles.tooltipText}>This launch template is 8 weeks long, so you need at least 8 weeks
                between now and the time of the launch. The first date above is the earliest date that will let you
                fulfill all the necessary tasks within this template to have a successful launch.
            </div>
        </div>
    );
};
