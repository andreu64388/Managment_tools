import { FC, memo, useCallback } from "react";
//@ts-ignore
import styles from "./ToDoItemHoriz.module.scss"
//@ts-ignore
import clock from "../../assets/images/clock.svg";
//@ts-ignore
import EditToDo from "../../assets/images/EditToDo.svg";
//@ts-ignore
import DeleteToDo from "../../assets/images/DeleteToDo.svg";
//@ts-ignore
import DeleteTask from "../../assets/images/DeleteTask.svg";
//@ts-ignore
import document_done from "../../assets/images/document_done_red.svg"
import { Link } from 'react-router-dom';
import TextTruncate from "../TextTruncate";
import { useTask } from "../../utils/hooks/useTask";
import { useTaskDelete } from "../../utils/hooks/useTaskDelete";
import { formatDateWithSpan, formatDuration } from "../../utils/format/format";
import LoadingDown from "../LoadingDown";

interface ToDoItemDashProps {
    data: any;
    planId: string;
    notice: any;
}

const ToDoItemDash: FC<ToDoItemDashProps> = ({ data, planId, notice }) => {

    const { handleSubmit, isLoading: isLoadCompleted }: any = useTask()
    const { handleSubmitDelete, isLoading } = useTaskDelete()

    const toggleComplete = async () => {
        if (!isLoadCompleted) {
            const task = {
                taskId: data.task?.id,
                planId,
            };

            const isSuccess = await handleSubmit(task);
            if (isSuccess) {
                notice(isSuccess, "complete");
            }
        }
    }


    const deleteTask = async () => {
        if (!isLoading) {
            const task = {
                taskId: data.task?.id,
                planId,
            };
            const isSuccess = await handleSubmitDelete(task);

            if (isSuccess) {
                notice(isSuccess, 'delete');
            }
        }
    }

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
                                    <img src={EditToDo} alt="EditToDo" />
                                    <p className={styles.btn_text}>Complete</p>
                                </button>
                                :
                                <div className={styles.completed_block}>
                                    <img src={DeleteToDo} alt="DeleteToDo" />
                                    <p>Completed</p>
                                </div>
                        }
                        <button className={styles.delete} onClick={deleteTask}>
                            <img src={DeleteTask} alt="DeleteTask" />
                        </button>
                    </div>
                </div>
            </div>
            {isLoading && <LoadingDown isVisible={isLoading} />}
            {isLoadCompleted && <LoadingDown isVisible={isLoadCompleted} />}
        </div>
    );
};

export default memo(ToDoItemDash)