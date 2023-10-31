import {FC, useState} from "react";
//@ts-ignore
import styles from "./ToDoItem.module.scss";
//@ts-ignore
import rocket from "../../assets/images/rocket_red_big.svg";
//@ts-ignore
import rocket_hover from "../../assets/images/rocket_hover.svg";

interface ToDoItemProps {
    Click: (data: ToDoData) => void;
}

interface ToDoData {
    title: string;
    description: string;
    duration: string;
    revenue: string;
    prepTime: string;
    idealPreReq: string;
}

export const ToDoItem: FC<ToDoItemProps> = ({Click}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const staticToDoData: ToDoData = {
        title: "Non-fiction book",
        description: "Launch template",
        duration: "5 days promo",
        revenue: "$18 per sub",
        prepTime: "6 weeks",
        idealPreReq: "1000 subs",
    };

    const handleItemClick = () => {
        Click(staticToDoData);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={styles.ToDoItem}
            onClick={handleItemClick}
        >
            <div className={styles.content}>
                <div className={styles.img}>
                    <img src={isHovered ? rocket_hover : rocket} alt="rocket"/>
                </div>
                <div className={styles.text}>
                    <p className={styles.title}>{staticToDoData.title}</p>
                    <p className={styles.description}>{staticToDoData.description}</p>
                </div>
            </div>
            <div className={styles.content_hidden}>
                <div className={styles.left}>
                    <div className={styles.block}>
                        <div className={styles.block_info}>{staticToDoData.duration}</div>
                        <div className={styles.block_text}>Duration</div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.block_info}>{staticToDoData.revenue}</div>
                        <div className={styles.block_text}>Revenue</div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.block}>
                        <div className={styles.block_info}>{staticToDoData.prepTime}</div>
                        <div className={styles.block_text}>Prep time</div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.block_info}>{staticToDoData.idealPreReq}</div>
                        <div className={styles.block_text}>Ideal Pre Req</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
