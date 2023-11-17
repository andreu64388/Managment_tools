import { FC } from "react";
//@ts-ignore
import styles from "./ToDoItemHoriz.module.scss"
//@ts-ignore
import clock from "../../assets/images/clock.svg";
//@ts-ignore
import document_done from "../../assets/images/document_done_red.svg"
import { Link } from 'react-router-dom';
import { TextTruncate } from "../TextTruncate";
import { useTask } from "../../utils/hooks/useTask";
import { useTaskDelete } from "../../utils/hooks/useTaskDelete";
import { formatDateWithSpan, formatDuration } from "../../utils/format/format";


interface ToDoItemDashProps {
    data: any;
    planId: number;
    notice: any;
}
export const ToDoItemDash: FC<ToDoItemDashProps> = ({ data, planId, notice }) => {

    const { handleSubmit }: any = useTask()
    const { handleSubmitDelete } = useTaskDelete()

    const toggleComplete = async () => {
        const task = {
            taskId: data.task?.id,
            planId,
        }
        const isSuccess = await handleSubmit(task);
        if (isSuccess) {
            notice();
        }
    };

    const deleteTask = async () => {
        const task = {
            taskId: data.task?.id,
            planId,
        }
        const isSuccess = await handleSubmitDelete(task);
        if (isSuccess) {
            notice();

        }
    };

    return (
        <div className={`${styles.ToDoItem} ${data?.task?.completed ? styles.completed : ''}`}>
            <div className={styles.content}>
                <div className={styles.icon}>
                    <div className={styles.date}>
                        {formatDateWithSpan(data?.dayNumber)}
                    </div>
                </div>
                <div className={styles.colomn}>
                    <div className={styles.text}>
                        <div className={styles.icon_container}>
                            <img src={document_done} alt={"document_done"} />
                        </div>
                        <Link to={`/about/${planId}/${data.task?.id}`} className={styles.description}>
                            <div className={styles.title}>

                                <TextTruncate
                                    text={data?.task?.title}
                                    maxCharactersDesktop={50}
                                    breakpointTablet={1073}
                                    maxCharactersTablet={40}
                                    maxCharactersMobile={20}
                                    maxCharactersMobileMin={20}
                                    breakpointMobile={989}
                                />
                            </div>
                            <div className={styles.times}>
                                <img src={clock} alt="icon_2" />
                                <p>{formatDuration(data?.task?.duration)}</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.buttons}>
                        {
                            !data?.task?.completed ?
                                <button className={styles.edit} onClick={toggleComplete}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                        fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M13.2773 3.08396C13.3876 3.15752 13.4642 3.27189 13.4902 3.40191C13.5162 3.53193 13.4895 3.66696 13.416 3.77729L7.41598 12.7773C7.37492 12.8388 7.32074 12.8904 7.25733 12.9284C7.19393 12.9665 7.12287 12.99 7.04929 12.9973C6.97571 13.0045 6.90143 12.9954 6.8318 12.9705C6.76218 12.9456 6.69894 12.9056 6.64665 12.8533L2.64665 8.85329C2.55833 8.75851 2.51024 8.63315 2.51253 8.50361C2.51481 8.37408 2.56729 8.25049 2.6589 8.15888C2.75051 8.06727 2.8741 8.01479 3.00363 8.01251C3.13316 8.01022 3.25853 8.05831 3.35331 8.14663L6.92198 11.7153L12.584 3.22263C12.6575 3.1123 12.7719 3.03572 12.9019 3.00971C13.032 2.98371 13.167 3.01041 13.2773 3.08396Z"
                                            fill="#FF385C" />
                                    </svg>
                                    <p className={styles.btn_text}>Complete</p>
                                </button>
                                :
                                <div className={styles.completed_block}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                                        fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M13.5967 0.855011C13.7346 0.946959 13.8303 1.08992 13.8628 1.25245C13.8954 1.41498 13.862 1.58376 13.77 1.72168L6.27003 12.9717C6.21872 13.0485 6.15099 13.1131 6.07173 13.1606C5.99247 13.2082 5.90365 13.2375 5.81167 13.2466C5.71969 13.2557 5.62684 13.2443 5.53981 13.2132C5.45278 13.1821 5.37374 13.132 5.30837 13.0667L0.308368 8.06668C0.197968 7.9482 0.137866 7.79149 0.140722 7.62958C0.143579 7.46766 0.209173 7.31317 0.323683 7.19866C0.438194 7.08415 0.592682 7.01855 0.754599 7.0157C0.916517 7.01284 1.07322 7.07294 1.1917 7.18334L5.65253 11.6442L12.73 1.02834C12.822 0.89044 12.9649 0.794706 13.1275 0.762201C13.29 0.729695 13.4588 0.763079 13.5967 0.855011Z"
                                            fill="#0091E2" />
                                    </svg>
                                    <p>Completed</p>
                                </div>
                        }
                        <button className={styles.delete} onClick={deleteTask}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M16.5 4.47795V4.70495C17.799 4.82373 19.0927 4.99454 20.378 5.21695C20.4751 5.23376 20.5678 5.26952 20.6511 5.32218C20.7343 5.37485 20.8063 5.4434 20.8631 5.52391C20.9198 5.60441 20.9601 5.69531 20.9817 5.7914C21.0033 5.88749 21.0058 5.9869 20.989 6.08395C20.9722 6.18099 20.9364 6.27378 20.8838 6.35701C20.8311 6.44023 20.7626 6.51227 20.682 6.56901C20.6015 6.62575 20.5106 6.66607 20.4146 6.68768C20.3185 6.70929 20.2191 6.71176 20.122 6.69495L19.913 6.65995L18.908 19.7299C18.8501 20.4835 18.5098 21.1875 17.9553 21.701C17.4008 22.2146 16.6728 22.4999 15.917 22.4999H8.08401C7.3282 22.4999 6.60026 22.2146 6.04573 21.701C5.4912 21.1875 5.15095 20.4835 5.09301 19.7299L4.08701 6.65995L3.87801 6.69495C3.78096 6.71176 3.68155 6.70929 3.58546 6.68768C3.48937 6.66607 3.39847 6.62575 3.31796 6.56901C3.15537 6.45442 3.04495 6.27994 3.01101 6.08395C2.97706 5.88795 3.02236 5.6865 3.13694 5.52391C3.25153 5.36131 3.42601 5.2509 3.62201 5.21695C4.90727 4.99427 6.20099 4.82347 7.50001 4.70495V4.47795C7.50001 2.91395 8.71301 1.57795 10.316 1.52695C11.4387 1.49102 12.5623 1.49102 13.685 1.52695C15.288 1.57795 16.5 2.91395 16.5 4.47795ZM10.364 3.02595C11.4547 2.99106 12.5463 2.99106 13.637 3.02595C14.39 3.04995 15 3.68395 15 4.47795V4.59095C13.0018 4.46959 10.9982 4.46959 9.00001 4.59095V4.47795C9.00001 3.68395 9.60901 3.04995 10.364 3.02595ZM10.009 8.97095C10.0052 8.87246 9.98203 8.77568 9.94082 8.68614C9.89961 8.59661 9.84117 8.51606 9.76883 8.44911C9.69649 8.38216 9.61168 8.33011 9.51923 8.29594C9.42678 8.26177 9.3285 8.24614 9.23001 8.24995C9.13152 8.25376 9.03474 8.27693 8.9452 8.31814C8.85567 8.35935 8.77512 8.41779 8.70817 8.49012C8.64122 8.56246 8.58917 8.64728 8.555 8.73973C8.52083 8.83218 8.5052 8.93046 8.50901 9.02895L8.85601 18.0289C8.8637 18.2277 8.95004 18.4153 9.09604 18.5504C9.16833 18.6173 9.25309 18.6693 9.34548 18.7035C9.43787 18.7376 9.53608 18.7533 9.63451 18.7494C9.73293 18.7456 9.82964 18.7225 9.91912 18.6813C10.0086 18.6401 10.0891 18.5817 10.156 18.5094C10.2229 18.4371 10.2749 18.3524 10.3091 18.26C10.3432 18.1676 10.3588 18.0694 10.355 17.9709L10.009 8.97095ZM15.489 9.02895C15.4963 8.92857 15.4834 8.82773 15.4509 8.73246C15.4185 8.63719 15.3672 8.54942 15.3001 8.47439C15.233 8.39936 15.1515 8.3386 15.0604 8.29574C14.9694 8.25287 14.8706 8.22877 14.77 8.22488C14.6694 8.22098 14.5691 8.23737 14.475 8.27307C14.3809 8.30877 14.2949 8.36304 14.2222 8.43266C14.1496 8.50227 14.0916 8.58581 14.0519 8.67829C14.0122 8.77077 13.9915 8.8703 13.991 8.97095L13.644 17.9709C13.6363 18.1699 13.708 18.3637 13.8432 18.5098C13.9784 18.6559 14.1661 18.7423 14.365 18.7499C14.5639 18.7576 14.7577 18.686 14.9038 18.5508C15.0499 18.4156 15.1363 18.2279 15.144 18.0289L15.489 9.02895Z"
                                    fill="#FF385C" fill-opacity="0.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};




