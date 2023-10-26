import {FC, useEffect} from "react";
//@ts-ignore
import styles from "./Home.module.scss"
//@ts-ignore
import {ReactComponent as Create} from "../../assets/images/create.svg"
import {Link} from "react-router-dom";
import {ToDoItemHoriz} from "../../componets";
//@ts-ignore
import rectannge from "../../assets/images/Rectangle1.svg"
//@ts-ignore
import rectannge_2 from "../../assets/images/Rectangle2.svg";
//@ts-ignore
import rectannge_3 from "../../assets/images/Rectangle.svg";
//@ts-ignore
import rectannge_4 from "../../assets/images/Rectangle3.svg";
//@ts-ignore
import rock from "../../assets/images/rock_main.svg";


export const HomePage: FC = () => {
    useEffect(() => {
            window.scroll(0, 0)
            document.title = "Home"
        }, []
    )
    return (

        <div className={styles.home}>
            <div className={styles.information}>
                <img src={rectannge} alt="1"
                     className={styles.rectannge_first}
                />
                <img src={rectannge_2} alt="2"
                     className={styles.rectannge_second}
                />
                <img src={rectannge_3} alt="3"
                     className={styles.rectannge_third}
                />
                <img src={rectannge_4} alt="4"
                     className={styles.rectannge_fourth}
                />
                <div className={styles.info}>
                    <h1>Hi, Alex!</h1>
                    <p className={styles.decription}>
                        You are almost there! <br/> Now it’s time to<Link to="/new-campaign"> create your first great
                        campaign</Link>
                    </p>
                </div>
                <div className={styles.img}>
                    <img src={rock} alt=""/>
                </div>
            </div>
            <div className={styles.empty}>
                <p className={styles.decription}>
                    There are no active campaigns now. Start with <Link to="/new-campaign"> creating a new
                    campaign.</Link>
                </p>
            </div>
            <div className={styles.up}>
                <h1 className={styles.title}>Campaigns</h1>
                <Link to="/new-campaign" className={styles.btn}>
                    <Create
                        fill={"white"}
                        width={"20"}
                        className={styles.svg}
                        height={"20"}
                    />
                    <p
                        className={styles.text}
                    >New campaign</p>
                </Link>
            </div>

            <div className={styles.down}>
                <div className={styles.tasks}>
                    <ToDoItemHoriz isCompl={true}/>
                    <ToDoItemHoriz isCompl={true}/>
                    <ToDoItemHoriz isCompl={true}/>
                </div>
                <h1 className={styles.title}>Finished campaigns</h1>
                <div className={styles.finished_tasks}>
                    <ToDoItemHoriz isCompl={false}/>
                </div>
            </div>
        </div>
    );
};