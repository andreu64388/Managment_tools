import { FC, useEffect } from "react";
//@ts-ignore
import styles from "./Home.module.scss"
//@ts-ignore
import { ReactComponent as Create } from "../../assets/images/create.svg"
import { Link } from "react-router-dom";
import { Loading, ToDoItemHoriz } from "../../componets";
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
import usePageSettings from "../../utils/hooks/usePageSettings";
import { useHome } from "../../utils/hooks/useHome";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/auth.slice";


export const HomePage: FC = () => {
    usePageSettings('Home');

    const user = useSelector(selectUser);

    const { plans, planCompleted, isLoading, errorMessage, refetch }: any = useHome();

    useEffect(() => {
        refetch()
    }, [])

    const notice = () => {
        refetch()
    }

    if (isLoading) {
        return <Loading />
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>
    }

    return (
        <div className={styles.home}>

            {plans?.length > 0 ? <>
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
                        <h1>Hi, {user?.email}!</h1>
                        <p className={styles.decription}>
                            You are almost there! <br /> Now it’s time to<Link to="/new-campaign"> create your first great
                                campaign</Link>
                        </p>
                    </div>
                    <div className={styles.img}>
                        <img src={rock} alt="" />
                    </div>
                </div>
            </> : <>
                <div className={styles.empty}>
                    <p className={styles.decription}>
                        There are no active campaigns now. Start with <Link to="/new-campaign"> creating a new
                            campaign.</Link>
                    </p>
                </div>
            </>}
            {plans?.length > 0 && (
                <>
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

                </>
            )}


            <div className={styles.down}>
                {plans?.length > 0 && (
                    <div className={styles.tasks}>
                        {
                            plans?.map((item: any) => {
                                return <ToDoItemHoriz key={item?.id}
                                    isCompl={true}
                                    data={item}
                                    notice={notice} />
                            })
                        }
                    </div>)}
                {planCompleted?.length > 0 && (<>
                    <h1 className={styles.title}>Finished campaigns</h1>
                    <div className={styles.finished_tasks}>
                        {
                            planCompleted?.map((item: any) => {
                                return <ToDoItemHoriz
                                    key={item?.id}
                                    isCompl={false}
                                    data={item}
                                    notice={notice}
                                    deadline={item.deadline}
                                />
                            }
                            )
                        }
                    </div></>)}

            </div>
        </div>
    );
};


