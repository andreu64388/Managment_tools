import { FC, memo } from "react";
//@ts-ignore
import styles from "./ProgressCircle.module.scss";


interface ProgressCircleProps {
    maxValue: number;
    progress: number;
}

const ProgressCircle: FC<ProgressCircleProps> = ({ maxValue, progress }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    const dashOffset = isNaN(progress) || maxValue === 0 ? 0 : (1 - (maxValue - progress) / maxValue) * circumference;

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
                        <stop offset="0%" stopColor="#896BE2" />
                        <stop offset="100%" stopColor="#FE7C93" />
                    </linearGradient>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FE7C93" />
                        <stop offset="100%" stopColor="#896BE2" />
                    </linearGradient>
                </defs>

                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className={styles["circle-background"]}
                    stroke="url(#backgroundGradient)"
                />
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className={styles["circle-progress"]}
                    style={{
                        strokeDasharray: `${circumference} ${circumference}`,
                        strokeDashoffset: dashOffset,
                        stroke: "url(#progressGradient)"
                    }}
                />
                <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" className={styles["circle-text"]}>
                    {progress}
                </text>
            </svg>
        </div>
    );
};


export default memo(ProgressCircle)