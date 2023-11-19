//@ts-ignore
import styles from "./ForgotPassword.module.scss"
//@ts-ignore
import password_mobile from "../../assets/images/password_mobile.svg"

//@ts-ignore
import logo from "../../assets/images/logoa.svg"
import { Link } from "react-router-dom";
import { Input } from "../../componets";
import { FC, useState } from "react";
import usePageSettings from "../../utils/hooks/usePageSettings"
import { useForgotPassword } from "../../utils/hooks/useForgotPassword";


const ForgotPassword = () => {
    usePageSettings('Forgot password');
    const [email, setEmail] = useState<string>("");
    const [emailClone, setEmailClone] = useState<string>("");
    const { errorMessage, isDataAvailable, SetErrorMessage, isLoading, handleSubmit, setIsDataAvailable } = useForgotPassword()
    const NextStep = (email: string) => {
        setEmail(email)
        handleSubmit(email)
        SetErrorMessage("")
    }

    const SendAgain = () => {

        if (email && !isLoading &&
            emailClone !== email) {
            SetErrorMessage("")

            handleSubmit(email)
            setEmailClone(email)
        }

    }

    return (
        <div className={styles.login}>
            <div className={styles.left}>
                <img src={logo} alt="logo"
                    className={styles.logo} />
                <img src={password_mobile}
                    alt="register"
                    className={styles.img} />
            </div>
            <div className={styles.right}>
                {
                    isDataAvailable ? <First
                        NextStep={NextStep}
                        errorMessage={errorMessage}
                        isLoading={isLoading} /> :
                        <Two
                            setIsDataAvailable={setIsDataAvailable}
                            SendAgain={SendAgain} />
                }
            </div>
        </div>
    )
}

interface FirstProps {
    NextStep: any;
    isLoading: boolean;
    errorMessage: string;
}

const First: FC<FirstProps> = ({ NextStep, isLoading, errorMessage }) => {
    const [email, setEmail] = useState("");
    const [emailClone, setEmailClone] = useState("");
    const Send = () => {

        if (email.length !== 0 && emailClone !== email
            && !isLoading) {
            NextStep(email)
            setEmailClone(email)
        }

    }
    return (<main className={styles.main}>
        <div className={styles.title}>
            <h1 className={styles.title}>Forgot password</h1>
        </div>
        <p className={styles.description}>
            To reset password, enter your email address below. We will send you a link to reset your password.
        </p>
        <div className={styles.form}>
            <Input
                placeholder={"Your email address"}
                label={"Email"}
                value={email}
                error={false}
                onChange={(value) => setEmail(value)}
            />
        </div>
        <p className={styles.error}>
            {errorMessage}
        </p>
        <div className={styles.btns}>
            <Link to="/login">
                Cancel
            </Link>
            <button
                onClick={Send}
                className={styles.btn}>
                {isLoading ? "Loading..." : "Send link to email"}
            </button>
        </div>
    </main>)
}


interface TwoProps {
    setIsDataAvailable: any;
    SendAgain: any;
}
const Two: FC<TwoProps> = ({ setIsDataAvailable, SendAgain }) => {
    const handleChange = () => {
        setIsDataAvailable(true)
    };
    return (<main className={styles.main}>
        <div className={styles.title}>
            <h1 className={styles.title}>Check your e-mail</h1>
        </div>
        <p className={styles.description}>
            We sent you an e-mail with instructions. Please check your inbox to reset the password.
        </p>
        <div className={styles.btns_check}>
            <button
                onClick={handleChange}
                className={styles.btn_two}>Change e-mail
            </button>
            <button
                onClick={SendAgain}
                className={styles.btn}>Send again
            </button>
        </div>
    </main>
    )
}



export default ForgotPassword