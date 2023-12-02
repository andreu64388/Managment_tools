import { FC, memo, useState } from "react";
//@ts-ignore
import styles from "./Detail.module.scss";
//@ts-ignore
import icon_1 from "../../assets/images/icon_1.svg";
//@ts-ignore
import clock from "../../assets/images/clock.svg";
//@ts-ignore
import ArrowLeftDetail from "../../assets/images/ArrowLeftDetail.svg";
import { Accordion, Loading, ProgressCircle, TextTruncate } from "../../componets";
import { Link, useParams } from "react-router-dom";
import usePageSettings from "../../utils/hooks/usePageSettings";
import { useGetPlan } from "../../utils/hooks/useGetPlan";
import { arrOfNav } from "../../assets/data/data";
import { formatDuration, formatDate, getMonthRange } from './../../utils/format/format';

const DetailPage: FC = () => {
    usePageSettings('Detail')
    const { planId } = useParams();
    const {
        planDetails,
        upcomingTask,
        weeks, Delete, Complete,
        errorMessage, isLoading
    }: any = useGetPlan(planId);




    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleItemClick = (index: number) => {
        setActiveIndex(index);
    };

    const notice = (id: string, type: string) => {

        if (type === "delete") {
            Delete(id);
        }
        else {
            Complete(id)
        }
    }

    if (isLoading) {
        return <Loading />
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>
    }


    return (
        <div className={styles.detail}>
            {
                planDetails && (
                    <NavigationBar
                        arrOfNav={arrOfNav}
                        activeIndex={activeIndex}
                        handleItemClick={handleItemClick}
                    />
                )
            }


            <main className={styles.main}>
                {planDetails && (
                    <PlanDetails
                        //@ts-ignore
                        title={planDetails?.title}
                        startDate={planDetails?.startDate}
                        deadline={planDetails?.deadline}
                        completedTasks={planDetails?.completedTasks}
                        totalTasks={planDetails?.totalTasks}
                        totalDays={planDetails?.totalDays}
                        daysLeft={planDetails?.daysLeft}
                    />
                )}

                {upcomingTask && <NextTask
                    upcomingTask={upcomingTask}
                    planId={planDetails?.planId} />}

                <div className={styles.accordians}>
                    {weeks?.map((el: any, index: number) => {
                        return (
                            <Accordion
                                key={el.id}
                                title={`Week ${index + 1}`}
                                data={el}
                                notice={notice}
                                planId={planDetails?.planId} />)
                    })
                    }
                </div>
            </main>
        </div>
    );
};




export default memo(DetailPage)

interface NextTaskProps {
    upcomingTask: any;
    planId: string;
}

const NextTask: FC<NextTaskProps> = memo(({ upcomingTask, planId }) => {
    return (
        <div className={styles.next_task}>
            <div className={styles.up_text}>
                <h1>Next task:</h1>
                <p className={styles.date}>
                    {formatDate(upcomingTask?.dayNumber)}
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
                                text={upcomingTask?.task?.title}
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
                            <p>{formatDuration(upcomingTask?.task?.duration)}</p>
                        </div>
                    </div>
                </div>
                <Link to={`/about/${planId}/${upcomingTask?.task?.id}`}>
                    Go to task
                    <img src={ArrowLeftDetail} alt="ArrowLeftDetail" />
                </Link>
            </div>
        </div>
    );
})

interface NavigationBarProps {
    arrOfNav: any[];
    activeIndex: number;
    handleItemClick: (index: number) => void;
}

const PlanDetails: FC = memo(({
    title,
    startDate,
    deadline,
    completedTasks,
    totalTasks,
    totalDays,
    daysLeft,
}: any) => {
    return (
        <>
            <div className={styles.up}>
                <h1 className={styles.title}>{title}</h1>
                <p>MVP launch for {getMonthRange(startDate, deadline)}</p>
            </div>
            <div className={styles.progress}>
                <div className={styles.block}>
                    <ProgressCircle progress={completedTasks} maxValue={totalTasks} />
                    <div className={styles.info}>Tasks</div>
                    <div className={styles.Text}>to do</div>
                </div>
                <div className={styles.block}>
                    <ProgressCircle progress={totalDays} maxValue={daysLeft} />
                    <div className={styles.info}>Days</div>
                    <div className={styles.Text}>to launch</div>
                </div>
                <div className={styles.block}>
                    <ProgressCircle progress={completedTasks} maxValue={totalTasks} />
                    <div className={styles.info}>Tasks</div>
                    <div className={styles.Text}>completed</div>
                </div>
            </div>
        </>
    );
})

const NavigationBar: FC<NavigationBarProps> = memo(({ arrOfNav, activeIndex, handleItemClick }) => {
    return (
        <div className={styles.overflow}>
            <nav className={styles.nav}>
                <ul>
                    {arrOfNav?.map((el, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <li key={index} className={isActive ? styles.active : ""}>
                                <div className={styles.btn} onClick={() => handleItemClick(index)}>
                                    <el.icon
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        fill={!isActive ? "#838188 " : "#FF385C"}
                                        width="20"
                                        height="20"
                                        fillOpacity={1}
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
    );
})