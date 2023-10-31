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
import register from "../../assets/images/register_mobile.svg"

//@ts-ignore
import logo from "../../assets/images/logoa.svg"

import {Link} from "react-router-dom";
import {Input, InputPassword} from "../../componets";
import {useEffect, useState} from "react";

export const Register = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 760);
    useEffect(() => {
            window.scroll(0, 0)
            document.title="Register"
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
            <div className={styles.left}

            >
                <img src={logo} alt="logo" className={styles.logo}/>
                <img src={isMobile ? register_mobile:register} alt="register" className={styles.img}/>
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
                            onChange={handleEmailChange}
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
                            value={password}
                            onChange={(value) => setPassword(value)}
                        />
                    </div>

                    <p className={styles.error}>
                        {errorMessage}
                    </p>
                    <button className={styles.btn}>Create account</button>
                    <div className={styles.bottom_social}>
                        <p className={styles.text}>
                            Or create an account with
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