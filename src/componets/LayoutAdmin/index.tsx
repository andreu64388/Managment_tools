import { FC } from "react";
//@ts-ignore
import styles from "./Layout.module.scss";
import Header from "../Header";
import Container from "../Container";
import Footer from "../Footer";

interface LayoutProps {
    children?: React.ReactNode;
}

const LayoutAdmin: FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header isAdmin={true} />
            <Container>
                <main className={styles.main}>
                    {children}
                </main>
            </Container>
            <Footer />
        </div>
    );
};

export default LayoutAdmin