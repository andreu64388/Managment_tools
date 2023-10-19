import React from "react";
import { FC } from "react";
//@ts-ignore
import styles from "./ProgressCircle.module.scss";

interface ProgressCircleProps {
   progress: number;
}

export const ProgressCircle: FC<ProgressCircleProps> = ({ progress }) => {
   const radius = 40;
   const circumference = 2 * Math.PI * radius;

   const dashOffset = (1 - progress / 100) * circumference;

   return (
      <div className={styles["progress-circle"]}>
         <svg
            width="150"
            height="150"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
         >
            <circle
               cx="50"
               cy="50"
               r={radius}
               className={styles["circle-background"]}
            />
            <circle
               cx="50"
               cy="50"
               r={radius}
               className={styles["circle-progress"]}
               style={{
                  strokeDasharray: `${circumference} ${circumference}`,
                  strokeDashoffset: dashOffset,
               }}
            />
            <text x="50" y="50" textAnchor="middle" className={styles["circle-text"]}>
               {progress}
            </text>
         </svg> 
      </div>
   );
};
