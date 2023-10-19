import React, {FC} from "react";
//@ts-ignore
import styles from "./ProgressCircle.module.scss";

interface ProgressCircleProps {
    progress: number;
}

export const ProgressCircle: FC<ProgressCircleProps> = ({progress}) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    const dashOffset = (1 - (100 - progress) / 100) * circumference;

    return (
        <div className={styles["progress-circle"]}>
            <svg
                width="150"
                height="150"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#896BE2"/>
                        <stop offset="100%" stopColor="#FE7C93"/>
                    </linearGradient>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FE7C93"/>
                        <stop offset="100%" stopColor="#896BE2"/>
                    </linearGradient>
                </defs>

                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className={styles["circle-background"]}
                    stroke="url(#backgroundGradient)" // Градиент для фона
                />
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className={styles["circle-progress"]}
                    style={{
                        strokeDasharray: `${circumference} ${circumference}`,
                        strokeDashoffset: dashOffset,
                        stroke: "url(#progressGradient)" // Градиент для прогресса
                    }}
                />
                <text x="50" y="50" textAnchor="middle" className={styles["circle-text"]}>
                    {progress}
                </text>
            </svg>
        </div>
    );
};
