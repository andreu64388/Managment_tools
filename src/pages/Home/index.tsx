import {FC, useEffect} from "react";
//@ts-ignore
import styles from "./Home.module.scss"
//@ts-ignore
import create from "../../assets/images/create.svg"
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


export const HomePage: FC = () => {
    useEffect(() => {
            window.scroll(0, 0)
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M49.68 40.448C65.04 20.7093 89.04 8 116 8C117.061 8 118.078 8.42143 118.828 9.17157C119.579 9.92172 120 10.9391 120 12C120 38.9653 107.291 62.96 87.552 78.3253C88.3729 83.4679 88.0683 88.7274 86.6592 93.7409C85.2501 98.7544 82.77 103.402 79.3901 107.364C76.0103 111.326 71.8111 114.508 67.0823 116.689C62.3535 118.871 57.2077 120 52 120C50.9391 120 49.9217 119.579 49.1716 118.828C48.4214 118.078 48 117.061 48 116V93.968C42.8156 89.874 38.1294 85.186 34.0373 80H12C10.9391 80 9.92172 79.5786 9.17157 78.8284C8.42143 78.0783 8 77.0609 8 76C7.99958 70.7918 9.12925 65.6454 11.3111 60.9162C13.4929 56.187 16.6748 51.9875 20.6374 48.6075C24.5999 45.2276 29.2487 42.7477 34.2628 41.3389C39.2769 39.9302 44.537 39.6263 49.68 40.448ZM80 36C76.8174 36 73.7652 37.2643 71.5147 39.5147C69.2643 41.7652 68 44.8174 68 48C68 51.1826 69.2643 54.2348 71.5147 56.4853C73.7652 58.7357 76.8174 60 80 60C83.1826 60 86.2348 58.7357 88.4853 56.4853C90.7357 54.2348 92 51.1826 92 48C92 44.8174 90.7357 41.7652 88.4853 39.5147C86.2348 37.2643 83.1826 36 80 36Z"
                              fill="#683DE4"/>
                        <path
                            d="M28.0535 91.9577C28.4748 91.6435 28.8301 91.2495 29.0991 90.7981C29.3681 90.3467 29.5456 89.8467 29.6213 89.3267C29.6971 88.8067 29.6697 88.2768 29.5407 87.7674C29.4117 87.258 29.1837 86.7789 28.8695 86.3577C28.5554 85.9364 28.1614 85.5811 27.71 85.3121C27.2585 85.0431 26.7585 84.8656 26.2385 84.7899C25.7185 84.7141 25.1887 84.7415 24.6793 84.8705C24.1698 84.9995 23.6908 85.2275 23.2695 85.5417C19.1783 88.585 15.997 92.689 14.07 97.4099C12.1429 102.131 11.5434 107.289 12.3362 112.326C12.4651 113.165 12.8576 113.941 13.4568 114.542C14.0561 115.143 14.831 115.538 15.6695 115.67C20.707 116.462 25.8653 115.862 30.5862 113.934C35.3071 112.005 39.4109 108.823 42.4535 104.731C42.7778 104.311 43.0152 103.83 43.1519 103.318C43.2886 102.805 43.3219 102.27 43.2498 101.744C43.1777 101.218 43.0017 100.712 42.7321 100.255C42.4624 99.7978 42.1045 99.3989 41.6791 99.0815C41.2538 98.764 40.7696 98.5345 40.2546 98.406C39.7396 98.2776 39.2043 98.253 38.6797 98.3336C38.1551 98.4141 37.6518 98.5983 37.1991 98.8753C36.7464 99.1523 36.3534 99.5166 36.0429 99.947C34.1829 102.448 31.7633 104.48 28.9775 105.878C26.1917 107.276 23.1173 108.003 20.0002 108C20.0002 101.44 23.1575 95.611 28.0535 91.9577Z"
                            fill="#683DE4"/>
                    </svg>
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
                    <img
                        src={create}
                        alt="create"
                        className={styles.img}/>
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