import { FC, memo } from "react";
//@ts-ignore
import styles from "./Footer.module.scss";
import Container from "../Container";


const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <main className={styles.content}>
                    <p className={styles.text}>
                        © Fiction Marketing Academy 2023
                    </p>
                </main>
            </Container>
        </footer>
    );
}

export default memo(Footer)