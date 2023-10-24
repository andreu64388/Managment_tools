import {FC, useState} from "react";
//@ts-ignore
import styles from "./Header.module.scss";
import {Container} from "../Container";
//@ts-ignore
import logo from "../../assets/images/logo.svg"
//@ts-ignore
import rocket from "../../assets/images/rocket.svg"
//@ts-ignore
import rocket_black from "../../assets/images/rocket_black.svg"
import {Link, useLocation} from "react-router-dom";

export const Header: FC = () => {
    const location = useLocation()
    const [isHovered, setIsHovered] = useState(false);
        const isBool = location.pathname === "/"
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className={styles.header}>
            <Container>
                <nav className={styles.content}>
                    <div className={styles.left}>
                        <Link to="/" className={styles.logo}>
                            <img src={logo} alt="logo"
                                 className={styles.logo__img}/>
                            <p className={styles.logo__text}>AuthorPilot</p>
                        </Link>
                        <Link  onMouseEnter={handleMouseEnter}
                               onMouseLeave={handleMouseLeave}
                            className={styles.item}
                            to="/"
                        >
                            <img
                                className={styles.item__img}
                                src={isBool ? rocket : (!isHovered ? rocket_black : rocket)}
                                alt="rocket"/>
                            <p className={isBool ? styles.item_text_act : styles.item__text}>Campaigns</p>
                        </Link>
                    </div>
                    <div className={styles.logout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g opacity="0.8">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M3 4.25C3 3.65326 3.23705 3.08097 3.65901 2.65901C4.08097 2.23705 4.65326 2 5.25 2H10.75C11.3467 2 11.919 2.23705 12.341 2.65901C12.7629 3.08097 13 3.65326 13 4.25V6.25C13 6.44891 12.921 6.63968 12.7803 6.78033C12.6397 6.92098 12.4489 7 12.25 7C12.0511 7 11.8603 6.92098 11.7197 6.78033C11.579 6.63968 11.5 6.44891 11.5 6.25V4.25C11.5 4.05109 11.421 3.86032 11.2803 3.71967C11.1397 3.57902 10.9489 3.5 10.75 3.5H5.25C5.05109 3.5 4.86032 3.57902 4.71967 3.71967C4.57902 3.86032 4.5 4.05109 4.5 4.25V15.75C4.5 16.164 4.836 16.5 5.25 16.5H10.75C10.9489 16.5 11.1397 16.421 11.2803 16.2803C11.421 16.1397 11.5 15.9489 11.5 15.75V13.75C11.5 13.5511 11.579 13.3603 11.7197 13.2197C11.8603 13.079 12.0511 13 12.25 13C12.4489 13 12.6397 13.079 12.7803 13.2197C12.921 13.3603 13 13.5511 13 13.75V15.75C13 16.3467 12.7629 16.919 12.341 17.341C11.919 17.7629 11.3467 18 10.75 18H5.25C4.65326 18 4.08097 17.7629 3.65901 17.341C3.23705 16.919 3 16.3467 3 15.75V4.25Z"
                                      fill="#1E1A26"/>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M6 9.99978C6 9.80087 6.07902 9.6101 6.21967 9.46945C6.36032 9.3288 6.55109 9.24978 6.75 9.24978H16.296L15.248 8.30678C15.1725 8.24152 15.1107 8.16185 15.0664 8.07242C15.022 7.983 14.996 7.88562 14.9898 7.786C14.9836 7.68638 14.9973 7.58652 15.0302 7.49228C15.063 7.39803 15.1144 7.31129 15.1812 7.23715C15.248 7.163 15.329 7.10294 15.4193 7.06049C15.5096 7.01803 15.6075 6.99403 15.7073 6.9899C15.807 6.98577 15.9066 7.00158 16.0001 7.03642C16.0936 7.07126 16.1793 7.12442 16.252 7.19278L18.752 9.44278C18.83 9.5131 18.8923 9.59902 18.935 9.69497C18.9777 9.79092 18.9998 9.89477 18.9998 9.99978C18.9998 10.1048 18.9777 10.2086 18.935 10.3046C18.8923 10.4005 18.83 10.4865 18.752 10.5568L16.252 12.8068C16.1793 12.8751 16.0936 12.9283 16.0001 12.9631C15.9066 12.998 15.807 13.0138 15.7073 13.0097C15.6075 13.0055 15.5096 12.9815 15.4193 12.9391C15.329 12.8966 15.248 12.8366 15.1812 12.7624C15.1144 12.6883 15.063 12.6015 15.0302 12.5073C14.9973 12.413 14.9836 12.3132 14.9898 12.2136C14.996 12.1139 15.022 12.0166 15.0664 11.9271C15.1107 11.8377 15.1725 11.758 15.248 11.6928L16.296 10.7498H6.75C6.65151 10.7498 6.55398 10.7304 6.46299 10.6927C6.37199 10.655 6.28931 10.5998 6.21967 10.5301C6.15003 10.4605 6.09478 10.3778 6.05709 10.2868C6.0194 10.1958 6 10.0983 6 9.99978Z"
                                      fill="#1E1A26"/>
                            </g>
                        </svg>
                        <p>
                            Log out
                        </p>
                    </div>
                </nav>
            </Container>
        </div>
    );
};