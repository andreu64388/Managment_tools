import { FC, useEffect, useState } from "react";
//@ts-ignore
import styles from "./Detail.module.scss";
//@ts-ignore
import icon_1 from "../../assets/images/icon_1.svg";
//@ts-ignore
import clock from "../../assets/images/clock.svg";
import { Accordion, ProgressCircle, TextTruncate } from "../../componets";
import { Link, useParams } from "react-router-dom";
import usePageSettings from "../../utils/hooks/usePageSettings";
import { useGetPlan } from "../../utils/hooks/useGetPlan";
import { arrOfNav } from "../../assets/data/data";
import { formatDuration, formatDate, getMonthRange, getMonthName } from './../../utils/format/format';



export const DetailPage: FC = () => {
    usePageSettings('Detail')
    const { planId } = useParams();
    const { plan, isLoading, refetch, errorMessage }: any = useGetPlan(Number(planId));

    useEffect(() => { refetch() }, [])

    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleItemClick = (index: number) => {
        setActiveIndex(index);
    };

    const notice = () => {
        refetch();
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className={styles.detail}>
            {
                plan && (
                    <div className={styles.overflow}>

                        <nav className={styles.nav}>
                            <ul>
                                {arrOfNav?.map((el, index) => {
                                    const isActive = index === activeIndex;
                                    return (
                                        <li key={index} className={isActive ? styles.active : ""}>
                                            <div className={styles.btn} onClick={() => handleItemClick(index)}>
                                                <el.icon
                                                    fill={!isActive ? "#838188 " : "#FF385C"}
                                                    width="20"
                                                    height="20"
                                                />
                                                <p className={`${isActive ? styles.active : styles.nonActive}`}>
                                                    {el.title}
                                                </p>
                                            </div>
                                            {isActive && <div className={styles.activeLine} />}
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>
                )
            }
            <main className={styles.main}>
                {plan && (
                    <>
                        <div className={styles.up}>
                            <h1 className={styles.title}>{plan?.title}</h1>
                            <p>MVP launch for  {getMonthRange(plan?.startDate, plan?.deadline)}
                            </p>
                        </div>
                        <div className={styles.progress}>
                            <div className={styles.block}>
                                <ProgressCircle
                                    progress={plan?.completedTasks}
                                    maxValue={plan?.totalTasks}
                                />
                                <div className={styles.info}>Tasks</div>
                                <div className={styles.Text}>to do</div>
                            </div>
                            <div className={styles.block}>
                                <ProgressCircle
                                    progress={plan?.totalDays}
                                    maxValue={plan?.daysLeft} />
                                <div className={styles.info}>Days</div>
                                <div className={styles.Text}>to launch</div>
                            </div>
                            <div className={styles.block}>
                                <ProgressCircle
                                    progress={plan?.completedTasks}
                                    maxValue={plan?.totalTasks} />
                                <div className={styles.info}>Tasks</div>
                                <div className={styles.Text}>completed</div>
                            </div>
                        </div></>
                )}

                {plan?.upcomingTask && (<div className={styles.next_task}>
                    <div className={styles.up_text}>
                        <h1>Next task:</h1>
                        <p className={styles.date}>
                            {formatDate(plan?.upcomingTask?.dayNumber)}
                        </p>
                    </div>
                    <div className={styles.down_text}>
                        <div className={styles.text}>
                            <div className={styles.img}>
                                <img src={icon_1} alt="done" />
                            </div>
                            <div className={styles.description}>
                                <div className={styles.title}>
                                    <TextTruncate
                                        text={plan?.upcomingTask?.task?.title}
                                        maxCharactersDesktop={60}
                                        breakpointTablet={1050}
                                        maxCharactersTablet={50}
                                        maxCharactersMobile={30}
                                        maxCharactersMobileMin={25}
                                        breakpointMobile={950}
                                    />
                                </div>
                                <div className={styles.times}>
                                    <img src={clock} alt="icon_2" />
                                    <p>{formatDuration(plan?.upcomingTask?.task?.duration)}</p>
                                </div>
                            </div>
                        </div>
                        <Link to={`/about/${plan?.planId}/${plan?.upcomingTask?.task?.id}`}>Go to task <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.20999 14.7699C7.07216 14.6266 6.99685 14.4345 7.0006 14.2357C7.00435 14.037 7.08686 13.8478 7.22999 13.7099L11.168 9.99989L7.22999 6.28989C7.15565 6.22245 7.0956 6.14077 7.0534 6.0497C7.01119 5.95863 6.9877 5.86002 6.98431 5.7597C6.98093 5.65939 6.99771 5.55941 7.03366 5.4657C7.06962 5.37199 7.12402 5.28644 7.19365 5.21414C7.26327 5.14184 7.3467 5.08425 7.43899 5.04479C7.53127 5.00532 7.63055 4.98478 7.73092 4.98438C7.83129 4.98398 7.93072 5.00374 8.02332 5.04247C8.11592 5.08121 8.1998 5.13814 8.26999 5.20989L12.77 9.45989C12.8426 9.52985 12.9003 9.61373 12.9398 9.70651C12.9792 9.79929 12.9995 9.89907 12.9995 9.99989C12.9995 10.1007 12.9792 10.2005 12.9398 10.2933C12.9003 10.386 12.8426 10.4699 12.77 10.5399L8.26999 14.7899C8.12674 14.9277 7.93462 15.003 7.73585 14.9993C7.53709 14.9955 7.34795 14.913 7.20999 14.7699Z"
                                fill="#683DE4" />
                        </svg></Link>

                    </div>
                </div>)}

                <div className={styles.accordians}>
                    {plan?.weeks?.map((el: any, index: number) => {
                        return (
                            <Accordion
                                title={`Week ${index + 1}`}
                                data={el}
                                notice={notice}
                                planId={plan?.planId} />
                        )
                    })
                    }

                </div>

            </main>
        </div>
    );
};










