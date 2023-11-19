import { FC, memo, useState } from "react";
//@ts-ignore
import styles from "./Header.module.scss";
import Container from "../Container";
//@ts-ignore
import logo from "../../assets/images/logo.svg"
//@ts-ignore
import rocket from "../../assets/images/rocket.svg"
//@ts-ignore
import rocket_black from "../../assets/images/rocket_black.svg"
import { Link, useLocation } from "react-router-dom";
//@ts-ignore
import { ReactComponent as LogoutIcon } from "../../assets/images/logout.svg";
import { useAppDispatch } from "../../redux/store";
import { Logout } from "../../redux/auth/auth.slice";



interface HeaderProps {
    isAdmin?: boolean
}

const Header: FC<HeaderProps> = ({ isAdmin = false }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isHoveredLogout, setIsHoveredLogout] = useState<boolean>(false);
    const isBool = location.pathname === "/";

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleMouseEnterLogout = () => {
        setIsHoveredLogout(true);
    };

    const handleMouseLeaveLogout = () => {
        setIsHoveredLogout(false);
    };

    const LogoutApp = () => {
        dispatch(Logout())
    }

    return (
        <div className={styles.header}>
            <Container>
                <nav className={styles.content}>

                    <Link to={isAdmin ? "/admin" : "/"} className={styles.logo}>
                        <img src={logo} alt="logo" className={styles.logo__img} />
                        <p className={styles.logo__text}>AuthorPilot</p>
                    </Link>

                    <div className={styles.left}>

                        <Link
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className={styles.item}
                            to={isAdmin ? "/admin" : "/"}
                        >

                            {!isAdmin && <img
                                className={styles.item__img}
                                src={isBool ? rocket : !isHovered ? rocket_black : rocket}
                                alt="rocket"
                            />}

                            <p
                                className={
                                    isBool ? styles.item_text_act : styles.item__text
                                }
                            >
                                {isAdmin ? "Admin" : "Campaigns"}
                            </p>
                        </Link>
                        <Link
                            className={styles.logout}
                            to="/login"
                            onClick={LogoutApp}
                            onMouseEnter={handleMouseEnterLogout}
                            onMouseLeave={handleMouseLeaveLogout}
                        >
                            <LogoutIcon
                                fill={!isHoveredLogout ? "#838188" : "#FF385C"}
                                width="20"
                                height="20"
                            />
                            <p>Log out</p>
                        </Link>
                    </div>
                </nav>
            </Container>
        </div>
    );
};


export default memo(Header)