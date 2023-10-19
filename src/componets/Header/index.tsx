import { FC } from "react";
//@ts-ignore
import styles from "./Header.module.scss";
import { Container } from "../Container";
//@ts-ignore
import logo from "../../assets/images/logo.svg"
//@ts-ignore
import rocket from "../../assets/images/rocket.svg"
//@ts-ignore
import rocket_black from "../../assets/images/rocket_black.svg"
import { Link, useLocation } from "react-router-dom";

export const Header: FC = () => {
   const location = useLocation()
   const isBool = location.pathname === "/"
   return (
      <div className={styles.header}>
         <Container>
            <nav className={styles.content}>
               <Link to="/" className={styles.logo}>
                  <img src={logo} alt="logo"
                     className={styles.logo__img} />
                  <p className={styles.logo__text}>AuthorPilot</p>
               </Link>
               <Link
                  className={styles.item}
                  to="/"
               >
                  <img
                     className={styles.item__img}
                     src={isBool ? rocket : rocket_black}
                     alt="rocket" />
                  <p className={isBool ? styles.item__text_act : styles.item__text}>Campaigns</p>
               </Link>
            </nav>
         </Container>
      </div>
   );
};