import { FC, memo, useState } from "react";
//@ts-ignore
import styles from "./ToDoItem.module.scss";
//@ts-ignore
import rocket from "../../assets/images/rocket_red_big.svg";
//@ts-ignore
import rocket_hover from "../../assets/images/rocket_hover.svg";
import TextTruncate from "../TextTruncate";
import { convertMinutes } from "../../utils/format/format";

interface ToDoItemProps {
    Click?: any;
    data?: any;
}

const ToDoItem: FC<ToDoItemProps> = ({ Click, data }) => {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleItemClick = () => {
        if (Click) Click(data);
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
                    <img src={isHovered ? rocket_hover : rocket} alt="rocket" />
                </div>
                <div className={styles.text}>
                    <div className={styles.title}>
                        <TextTruncate
                            text={data?.name}
                            maxCharactersDesktop={20}
                            maxCharactersTablet={20}
                            maxCharactersMobile={20}
                            maxCharactersMobileMin={20}
                        />
                    </div>
                    <div className={styles.description}>Launch template</div>
                </div>
            </div>
            <div className={styles.content_hidden}>
                <div className={styles.left}>
                    <div className={styles.block}>
                        <div className={styles.block_info}>{convertMinutes(data?.prepTime)}</div>
                        <div className={styles.block_text}>Prep time</div>
                    </div>
                </div>
                <div className={styles.right}>
                    {data.idealPreReq && (<div className={styles.block}>
                        <div className={styles.block_info}>{data?.idealPreReq}</div>
                        <div className={styles.block_text}>Ideal Pre Req</div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default memo(ToDoItem);