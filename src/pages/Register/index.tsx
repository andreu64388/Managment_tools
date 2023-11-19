import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Input, InputPassword, Socials } from "../../componets";
import useRegistration from "../../utils/hooks/useRegister";
import useMobile from "../../utils/hooks/useMobile";
import usePageSettings from "../../utils/hooks/usePageSettings";
//@ts-ignore 
import styles from "./Register.module.scss";
//@ts-ignore 
import register_mobile from "../../assets/images/register.svg";
//@ts-ignore 
import register_deskstop from "../../assets/images/register_mobile.svg";
//@ts-ignore 
import logo from "../../assets/images/logoa.svg";

const Register = () => {
    usePageSettings("Register");
    const isMobile = useMobile();
    const { SetErrorMessage, errorMessage, isLoading, handleSubmit } = useRegistration();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [previousValues, setPreviousValues] = useState({ email: "", password: "", confirmPassword: "" });

    const Send = useCallback(() => {
        if (!isLoading) {
            let errorMessage = "";
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errorMessage = "Invalid email format. Please enter a valid email address.";
            } else if (password.length < 8) {
                errorMessage = "Password must be at least 8 characters long.";
            } else if (password !== confirmPassword) {
                errorMessage = "Passwords do not match.";
            }
            if (errorMessage) {
                SetErrorMessage(errorMessage);
            } else {
                const newUser = { email, password };
                if (
                    newUser.email !== previousValues.email ||
                    newUser.password !== previousValues.password ||
                    confirmPassword !== previousValues.confirmPassword
                ) {
                    setPreviousValues({ email, password, confirmPassword });
                    handleSubmit(newUser);
                }
            }
        }
    }, [isLoading, email, password, confirmPassword, SetErrorMessage, handleSubmit, previousValues]);

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
                    <p className={styles.description}>Create an account</p>
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
                    <p className={styles.error}>{errorMessage}</p>
                    <button className={styles.btn} onClick={Send}>
                        {isLoading ? "Loading..." : "Create account"}
                    </button>
                    <div className={styles.bottom_social}>
                        <p className={styles.text}>Or create an account with</p>
                        <Socials />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Register;
