import {FC, useEffect, useState} from "react";
//@ts-ignore
import {ReactComponent as DashboardIcon} from "../../assets/images/dashboard.svg";
//@ts-ignore
import {ReactComponent as DoneIcon} from "../../assets/images/circle_done.svg";
//@ts-ignore
import {ReactComponent as DocumentIcon} from "../../assets/images/document.svg";
//@ts-ignore
import {ReactComponent as CalendarIcon} from "../../assets/images/cal.svg";
//@ts-ignore
import {ReactComponent as PreferencesIcon} from "../../assets/images/preferences.svg";
//@ts-ignore
import styles from "./Detail.module.scss";
//@ts-ignore
import icon_1 from "../../assets/images/icon_1.svg";
//@ts-ignore
import clock from "../../assets/images/clock.svg";
import {Accordion, ProgressCircle} from "../../componets";
import {Link} from "react-router-dom";

const arr = [
    {
        title: "Dashboard",
        icon: DashboardIcon,
    },
    {
        title: "Completed tasks",
        icon: DoneIcon,
    },
    {
        title: "Details",
        icon: DocumentIcon,
    },
    {
        title: "Calendar",
        icon: CalendarIcon,
    },
    {
        title: "Preferences",
        icon: PreferencesIcon,
    },
];

export const DetailPage: FC = () => {
    useEffect(() => {
            window.scroll(0, 0)
        document.title="Dashboard"
        }, []
    )
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleItemClick = (index: number) => {
        setActiveIndex(index);
    };

    return (

        <div className={styles.detail}>
            <nav className={styles.nav}>
                <ul>
                    {arr.map((el, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <li key={index} className={isActive ? styles.active : ""}>
                                <div className={styles.btn} onClick={() => handleItemClick(index)}>
                                    <el.icon
                                        fill={!isActive ? "#838188 " : "#FF385C"}
                                        width="20"
                                        height="20"
                                    />
                                    <p className={`${isActive ? styles.active : styles.nonActive }`}>
                                        {el.title}
                                    </p>
                                </div>
                                {isActive && <div className={styles.activeLine}/>}
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <main className={styles.main}>
                <div className={styles.up}>
                    <h1 className={styles.title}>Non-fiction book</h1>
                    <p>MVP launch for September</p>
                </div>
                <div className={styles.progress}>
                    <div className={styles.block}>
                        <ProgressCircle progress={20}/>
                        <div className={styles.info}>Tasks</div>
                        <div className={styles.Text}>To do</div>
                    </div>
                    <div className={styles.block}>
                        <ProgressCircle progress={46}/>
                        <div className={styles.info}>Days</div>
                        <div className={styles.Text}>To launch</div>
                    </div>
                    <div className={styles.block}>
                        <ProgressCircle progress={0}/>
                        <div className={styles.info}>Tasks</div>
                        <div className={styles.Text}>Completed</div>
                    </div>
                </div>
                <div className={styles.next_task}>
                    <div className={styles.up_text}>
                        <h1>Next task:</h1>
                        <p className={styles.date}>
                            Sep 1
                        </p>
                    </div>
                    <div className={styles.down_text}>
                        <div className={styles.text}>
                            <div className={styles.img}>
                                <img src={icon_1} alt="done"    />
                            </div>
                            <div className={styles.description}>
                                <div className={styles.title}>Watch overall launch plan video</div>
                                <div className={styles.times}>
                                    <img src={clock} alt="icon_2"/>
                                    <p>15 minutes</p>
                                </div>
                            </div>
                        </div>
                        <Link to="/about/12">Go to task <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                             viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M7.20999 14.7699C7.07216 14.6266 6.99685 14.4345 7.0006 14.2357C7.00435 14.037 7.08686 13.8478 7.22999 13.7099L11.168 9.99989L7.22999 6.28989C7.15565 6.22245 7.0956 6.14077 7.0534 6.0497C7.01119 5.95863 6.9877 5.86002 6.98431 5.7597C6.98093 5.65939 6.99771 5.55941 7.03366 5.4657C7.06962 5.37199 7.12402 5.28644 7.19365 5.21414C7.26327 5.14184 7.3467 5.08425 7.43899 5.04479C7.53127 5.00532 7.63055 4.98478 7.73092 4.98438C7.83129 4.98398 7.93072 5.00374 8.02332 5.04247C8.11592 5.08121 8.1998 5.13814 8.26999 5.20989L12.77 9.45989C12.8426 9.52985 12.9003 9.61373 12.9398 9.70651C12.9792 9.79929 12.9995 9.89907 12.9995 9.99989C12.9995 10.1007 12.9792 10.2005 12.9398 10.2933C12.9003 10.386 12.8426 10.4699 12.77 10.5399L8.26999 14.7899C8.12674 14.9277 7.93462 15.003 7.73585 14.9993C7.53709 14.9955 7.34795 14.913 7.20999 14.7699Z"
                                  fill="#683DE4"/>
                        </svg></Link>

                    </div>
                </div>
                <div className={styles.accordians}>
                    <Accordion title="Week 1" description="Это описание аккордеона."/>
                    <Accordion title="Week 2" description="Это описание аккордеона."/>
                    <Accordion title="Week 3" description="Это описание аккордеона."/>
                    <Accordion title="Week 4" description="Это описание аккордеона."/>
                </div>
            </main>
        </div>
    );
};