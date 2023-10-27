//@ts-ignore
import styles from "./Login.module.scss"
//@ts-ignore
import facebook from "../../assets/images/Facebook.svg"

//@ts-ignore
import google from "../../assets/images/Google.svg"

//@ts-ignore
import apple from "../../assets/images/Apple.svg"

//@ts-ignore
import login from "../../assets/images/login.svg"
//@ts-ignore
import login_mobile from "../../assets/images/login_mobile.svg"
//@ts-ignore
import logo from "../../assets/images/logoa.svg"
import {Link} from "react-router-dom";
import {Input, InputPassword} from "../../componets";
import {useEffect, useState} from "react";

export const Login = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 760);
    useEffect(() => {
            window.scroll(0, 0)
            document.title = "Login"

        const handleResize = () => {
            setIsMobile(window.innerWidth < 760);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
        }, []
    )
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, SetErrorMessage] = useState<string>("")
    const handleEmailChange = (value: string) => {
        setEmail(value);
    };
    return (

        <div className={styles.login}>
            <div className={styles.left}>
                <img src={logo} alt="logo" className={styles.logo}/>
                <img src={isMobile ? login_mobile: login} alt="register" className={styles.img}/>
            </div>
            <div className={styles.right}>
                <div className={styles.question}>
                    Don’t have an account? <Link to="/register">Sign up</Link>
                </div>
                <main className={styles.main}>
                    <div className={styles.title}>
                        <h1 className={styles.title}>Welcome back</h1>
                    </div>
                    <p className={styles.description}>
                        Log in to your account
                    </p>
                    <div className={styles.form}>
                        <Input
                            placeholder={"Enter your email address"}
                            label={"Email"}
                            value={email}
                            error={false}
                            onChange={handleEmailChange}
                        />
                        <InputPassword
                            placeholder={"Enter your password"}
                            label="Password"
                            error={false}
                            value={password}
                            onChange={(value) => setPassword(value)}
                        />
                    </div>
                    <Link
                        to={"/forgot"}
                        className={styles.forgot}>
                        Forgot password?
                    </Link>
                    <p className={styles.error}>
                        {errorMessage}
                    </p>
                    <button className={styles.btn}>Log in</button>
                    <div className={styles.bottom_social}>
                        <p className={styles.text}>
                            Or log in with
                        </p>
                        <div className={styles.icons}>
                            <div className={styles.icon}>
                                <img src={facebook} alt="facebbok"/>
                            </div>
                            <div className={styles.icon}>
                                <img src={google} alt="google"/>
                            </div>
                            <div className={styles.icon}>
                                <img src={apple} alt="apple"/>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}