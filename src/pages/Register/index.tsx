//@ts-ignore
import styles from "./Register.module.scss"
//@ts-ignore
import facebook from "../../assets/images/Facebook.svg"
//@ts-ignore
import google from "../../assets/images/Google.svg"

//@ts-ignore
import apple from "../../assets/images/Apple.svg"

//@ts-ignore
import register_mobile from "../../assets/images/register.svg"
//@ts-ignore
import register_deskstop from "../../assets/images/register_mobile.svg"

//@ts-ignore
import logo from "../../assets/images/logoa.svg"

import { Link } from "react-router-dom";
import { Input, InputPassword } from "../../componets";
import { useState } from "react";
import useRegistration from "../../utils/hooks/useRegister"
import useMobile from "../../utils/hooks/useMobile"

export const Register = () => {

    const isMobile = useMobile()
    const { SetErrorMessage, errorMessage, isLoading, handleSubmit } = useRegistration();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const Send = () => {
        if (!isLoading) {
            if (password !== confirmPassword) return SetErrorMessage("Passwords do not match")
            const user = {
                email,
                password,
            };
            handleSubmit(user)
        }
    }

    return (
        <div className={styles.login}>
            <div className={styles.left}>
                <img src={logo} alt="logo" className={styles.logo} />
                <img src={isMobile ? register_mobile : register_deskstop} alt="register" className={styles.img} />
            </div>
            <div className={styles.right}>
                <div className={styles.question}>
                    Already have an account? <Link to="/login">Log in</Link>
                </div>
                <main className={styles.main}>
                    <div className={styles.title}>
                        <h1 className={styles.title}>Welcome to AuthorPilot!</h1>
                    </div>
                    <p className={styles.description}>
                        Create an account
                    </p>
                    <div className={styles.form}>
                        <Input
                            placeholder={"Your email address"}
                            label={"Email"}
                            value={email}
                            error={false}
                            onChange={(value) => setEmail(value)}
                        />
                        <InputPassword
                            placeholder={"Your password"}
                            label="Password"
                            error={false}
                            value={password}
                            onChange={(value) => setPassword(value)}
                        />
                        <InputPassword
                            placeholder={"Your password"}
                            label="Confirm Password"
                            error={false}
                            value={confirmPassword}
                            onChange={(value) => setConfirmPassword(value)}
                        />
                    </div>

                    <p className={styles.error}>
                        {errorMessage}
                    </p>
                    <button className={styles.btn}
                        onClick={Send}>
                        {isLoading ? "Loading..." : "Create account"}
                    </button>
                    <div className={styles.bottom_social}>
                        <p className={styles.text}>
                            Or create an account with
                        </p>
                        <div className={styles.icons}>
                            <div className={styles.icon}>
                                <img src={facebook} alt="facebbok" />
                            </div>
                            <div className={styles.icon}>
                                <img src={google} alt="google" />
                            </div>
                            <div className={styles.icon}>
                                <img src={apple} alt="apple" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}