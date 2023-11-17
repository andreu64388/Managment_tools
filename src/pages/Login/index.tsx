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
import { Link } from "react-router-dom";
import { Input, InputPassword, Socials } from "../../componets";
import { useState } from "react";
import useMobile from "../../utils/hooks/useMobile"
import useLogin from "../../utils/hooks/useLogin"
import usePageSettings from "../../utils/hooks/usePageSettings"

export const Login = () => {

    usePageSettings('Login');
    const { errorMessage, isLoading, handleSubmit, SetErrorMessage } = useLogin()
    const isMobile = useMobile();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const Send = () => {
        if (!isLoading) {
            let errorMessage = '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errorMessage = 'Invalid email format. Please enter a valid email address.';
            } else if (password.length < 2) {
                errorMessage = 'Password must be at least 8 characters long.';
            }
            if (errorMessage) {
                SetErrorMessage(errorMessage);
            } else {

                const user = {
                    email,
                    password,
                };
                handleSubmit(user);
            }
        }
    };


    return (
        <div className={styles.login}>
            <div className={styles.left}>
                <img src={logo} alt="logo" className={styles.logo} />
                <img src={isMobile ? login_mobile : login} alt="register" className={styles.img} />
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
                            onChange={(value) => setEmail(value)}
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
                    <button className={styles.btn}
                        onClick={Send}>
                        {isLoading ? "Loading..." : "Log in"}
                    </button>
                    <div className={styles.bottom_social}>
                        <p className={styles.text}>
                            Or log in with
                        </p>
                        <Socials />
                    </div>
                </main>
            </div>
        </div>
    )
}