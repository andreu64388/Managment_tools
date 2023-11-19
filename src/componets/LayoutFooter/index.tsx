import { FC } from "react";
//@ts-ignore
import styles from "./Layout.module.scss";
import Container from "../Container";
import Footer from "../Footer";

interface LayoutProps {
    children?: React.ReactNode;
}

const LayoutFooter: FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Container>
                <main className={styles.main}>
                    {children}
                </main>
            </Container>
            <Footer />
        </div>
    );
};

export default LayoutFooter