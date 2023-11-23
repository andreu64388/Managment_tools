import { FC, memo } from "react";
//@ts-ignore
import styles from "./ToDoItemHoriz.module.scss"
//@ts-ignore
import delete_img from "../../assets/images/delete.svg"
//@ts-ignore
import rocket_white from "../../assets/images/rocket_white.svg"
//@ts-ignore
import arrow from "../../assets/images/arrow.svg"
//@ts-ignore
import edit from "../../assets/images/edit.svg";
import { Link } from "react-router-dom";
//@ts-ignore
import icon_1 from "../../assets/images/icon_1.svg";
//@ts-ignore
import clock from "../../assets/images/clock.svg";
import TextTruncate from "../TextTruncate";
import { usePlanDelete } from "../../utils/hooks/useDeletePlan";
import { formatDateMonth, getTaskLabel, formatDuration } from "../../utils/format/format";
import LoadingDown from "../LoadingDown";

interface ToDoItemHorizProps {
    isCompl: boolean;
    data?: any;
    notice: any;
    deadline?: string;
}

const ToDoItemHoriz: FC<ToDoItemHorizProps> = ({ isCompl, data, notice, deadline }) => {
    const { id, totalTasks, upcomingTask, name } = data;

    const { handleSubmitPlan, isLoading } = usePlanDelete()

    const deletePlan = async (planId: string) => {

        if (!isLoading) {
            const isSuccess = await handleSubmitPlan(planId);
            if (isSuccess) {
                notice(isSuccess);
            }
        }
    }

    const formattedDate = formatDateMonth(deadline ? deadline : upcomingTask?.dayNumber);
    const taskTodo = getTaskLabel(upcomingTask?.dayNumber);

    return (
        <div className={styles.ToDoItem}>
            <div className={`${styles.up} ${!isCompl ? styles.completed : ""}`}>
                <div className={styles.icon}>
                    <div className={`${styles.icon_content} ${!isCompl ? styles.completed : ""}`}>
                        <div className={styles.icon_container}>
                            <img className={styles.icon_img} src={isCompl ? rocket_white : arrow} alt="img" />
                        </div>
                    </div>
                    <div className={styles.textTodo}>
                        <div className={styles.date}>
                            <p className={styles.date_info}>{formattedDate}</p>
                            <p className={styles.date_start}>Launch date</p>
                        </div>
                        <Link to={`/details/${id}`} className={styles.description}>
                            <TextTruncate
                                text={name}
                                maxCharactersDesktop={50}
                                maxCharactersTablet={35}
                                maxCharactersMobile={50}
                                maxCharactersMobileMin={30}
                            />
                        </Link>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.count_task}>
                        <p className={styles.count}>{totalTasks}</p>
                        <p className={styles.task}>Tasks</p>
                    </div>
                    <Link to={`/details/${id}`} className={styles.edit}>
                        <img src={edit} alt="edit" className={styles.btn_img} />
                        <p className={styles.btn_text}>Edit</p>
                    </Link>
                    <button onClick={() => deletePlan(id)} className={styles.delete}>
                        <img className={styles.delete_img} src={delete_img} alt="delete" />
                    </button>
                </div>
            </div>
            {isCompl && (
                <div className={styles.down}>
                    <div className={styles.down_text}>
                        <div className={styles.text}>
                            <div className={styles.main_text}>{taskTodo}</div>
                            <div className={styles.main_img}>
                                <div className={styles.img}>
                                    <img src={icon_1} alt="done" className={styles.img} />
                                </div>
                                <div className={styles.description}>
                                    <div className={styles.title}>
                                        <TextTruncate
                                            text={upcomingTask?.task?.title}
                                            maxCharactersDesktop={50}
                                            maxCharactersTablet={35}
                                            maxCharactersMobile={40}
                                            maxCharactersMobileMin={30}
                                        />
                                    </div>
                                    <div className={styles.times}>
                                        <img src={clock} alt="icon_2" />
                                        <p>{formatDuration(upcomingTask?.task?.duration)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to={`/about/${id}/${upcomingTask?.task?.id}`}>
                            Go to task
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                fill="none">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.20999 14.7699C7.07216 14.6266 6.99685 14.4345 7.0006 14.2357C7.00435 14.037 7.08686 13.8478 7.22999 13.7099L11.168 9.99989L7.22999 6.28989C7.15565 6.22245 7.0956 6.14077 7.0534 6.0497C7.01119 5.95863 6.9877 5.86002 6.98431 5.7597C6.98093 5.65939 6.99771 5.55941 7.03366 5.4657C7.06962 5.37199 7.12402 5.28644 7.19365 5.21414C7.26327 5.14184 7.3467 5.08425 7.43899 5.04479C7.53127 5.00532 7.63055 4.98478 7.73092 4.98438C7.83129 4.98398 7.93072 5.00374 8.02332 5.04247C8.11592 5.08121 8.1998 5.13814 8.26999 5.20989L12.77 9.45989C12.8426 9.52985 12.9003 9.61373 12.9398 9.70651C12.9792 9.79929 12.9995 9.89907 12.9995 9.99989C12.9995 10.1007 12.9792 10.2005 12.9398 10.2933C12.9003 10.386 12.8426 10.4699 12.77 10.5399L8.26999 14.7899C8.12674 14.9277 7.93462 15.003 7.73585 14.9993C7.53709 14.9955 7.34795 14.913 7.20999 14.7699Z"
                                    fill="#683DE4"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            )}
            {isLoading && <LoadingDown isVisible={isLoading} />}
        </div>
    );
}

export default memo(ToDoItemHoriz);





