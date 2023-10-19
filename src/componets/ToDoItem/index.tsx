import {FC} from "react";
//@ts-ignore
import styles from "./ToDoItem.module.scss"
//@ts-ignore
import rocket from "../../assets/images/rocket_red_big.svg"

interface ToDoItemProps {
    Click: (data: any) => void;
}

export const ToDoItem: FC<ToDoItemProps> = ({Click}) => {
    const ClickTodo = (item: any) => {
        Click(item)
    }

    return (
        <div className={styles.ToDoItem} onClick={() => ClickTodo("f")}>
            <div className={styles.content}>
                <div className={styles.img}>
                    <img src={rocket} alt="rocket"/>
                </div>
                <div className={styles.text}>
                    <p className={styles.title}>Non-fiction book </p>
                    <p className={styles.description}>
                        Launch template
                    </p>
                </div>
            </div>
            <div className={styles.content_hidden}>
                <div className={styles.left}>
                    <div className={styles.block}>
                        <div className={styles.block_info}>
                            5 days promo
                        </div>
                        <div className={styles.block_text}>
                            Duration
                        </div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.block_info}>
                            $18 per sub
                        </div>
                        <div className={styles.block_text}>
                            Revenue
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.block}>
                        <div className={styles.block_info}>
                            6 weeks
                        </div>
                        <div className={styles.block_text}>
                            Prep time
                        </div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.block_info}>
                            1000 subs
                        </div>
                        <div className={styles.block_text}>
                            Ideal Pre Req
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};