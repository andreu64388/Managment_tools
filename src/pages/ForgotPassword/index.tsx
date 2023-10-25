//@ts-ignore
import styles from "./ForgotPassword.module.scss"
//@ts-ignore
import facebook from "../../assets/images/Facebook.svg"

//@ts-ignore
import google from "../../assets/images/Google.svg"

//@ts-ignore
import apple from "../../assets/images/Apple.svg"

//@ts-ignore
import password from "../../assets/images/password.svg"

//@ts-ignore
import logo from "../../assets/images/logoa.svg"

import {Link} from "react-router-dom";
import {Input, InputPassword} from "../../componets";
import {FC, useEffect, useState} from "react";


export const ForgotPassword = () => {
    useEffect(() => {
            window.scroll(0, 0)
            document.title = "Forgot password"
        }, []
    )
    const [step, setStep] = useState(1);
    const NextStep = () => {
        setStep(step => step + 1);
    }
    return (

        <div className={styles.login}>
            <div className={styles.left}>
                <img src={logo} alt="logo" className={styles.logo}/>
                <img src={password} alt="register" className={styles.img}/>
            </div>
            <div className={styles.right}>
                {step === 1 && <First NextStep={NextStep}/>}
                {step === 2 && <Two NextStep={NextStep}/>}
                {step === 3 && <Three NextStep={NextStep}/>}
            </div>
        </div>
    )
}

interface FirstProps {
    NextStep: any;
}

const First: FC<FirstProps> = ({NextStep}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, SetErrorMessage] = useState<string>("")
    const handleEmailChange = (value: string) => {
        setEmail(value);
    };
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
                onChange={handleEmailChange}
            />
        </div>
        <div className={styles.btns}>
            <Link to="/login">
                Cancel
            </Link>
            <button
                onClick={NextStep}
                className={styles.btn}>Send link to email
            </button>

        </div>

    </main>)
}


interface TwoProps {
    NextStep: any;
}

const Two: FC<TwoProps> = ({NextStep}) => {
    const [email, setEmail] = useState("");
    const [errorMessage, SetErrorMessage] = useState<string>("")
    const handleEmailChange = (value: string) => {
        setEmail(value);
    };
    return (<main className={styles.main}>
            <div className={styles.title}>
                <h1 className={styles.title}>Check your e-mail</h1>
            </div>
            <p className={styles.description}>
                We sent you e-mail with instructions. Please check your inbox to reset the password.
            </p>

            <div className={styles.btns_check}>
                <button
                    onClick={NextStep}
                    className={styles.btn_two}>Change e-mail
                </button>
                <button
                    onClick={NextStep}
                    className={styles.btn}>Send again
                </button>
            </div>
        </main>
    )
}


interface ThreeProps {
    NextStep: any;
}

const Three: FC<FirstProps> = ({NextStep}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, SetErrorMessage] = useState<string>("")
    const handleEmailChange = (value: string) => {
        setEmail(value);
    };
    return (<main className={styles.main}>
        <div className={styles.title}>
            <h1 className={styles.title}>Set new password</h1>
        </div>
        <p className={styles.description}>
            Create a password containing not less than 8 letters and at least 1 number
        </p>
        <div className={styles.form}>
            <InputPassword
                placeholder={"Create a password"}
                label={"Create a password"}
                value={email}
                error={false}
                onChange={handleEmailChange}
            />
            <InputPassword
                placeholder={"Confirm password"}
                label={"Confirm password"}
                value={email}
                error={false}
                onChange={handleEmailChange}
            />
        </div>
        <div className={styles.confirm}>

            <button

                className={styles.btn}>Send link to email
            </button>

        </div>

    </main>)
}