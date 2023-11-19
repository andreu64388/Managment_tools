//@ts-ignore
import styles from "./ForgotPassword.module.scss"
//@ts-ignore
import password_mobile from "../../assets/images/password_mobile.svg"
//@ts-ignore
import logo from "../../assets/images/logoa.svg"
import { InputPassword } from "../../componets";
import { FC, useState } from "react";
import usePageSettings from "../../utils/hooks/usePageSettings"
import { useParams } from "react-router-dom";
import { useTokenValid } from "../../utils/hooks/useTokenValid";
import { useResetPassword } from "../../utils/hooks/useResetPassword";


const ResetPassword = () => {
    usePageSettings('Reset password');

    const { token } = useParams();

    const { isValid, isLoading } = useTokenValid(token || "");

    const { errorMessage, SetErrorMessage, isLoadingSend, handleSubmit } = useResetPassword();



    return (
        <div className={styles.login}>
            <div className={styles.left}>
                <img src={logo} alt="logo" className={styles.logo} />
                <img src={password_mobile} alt="register" className={styles.img} />
            </div>
            <div className={styles.right}>
                {isLoading ? <div className={styles.load}>Loading...</div> : <div>
                    {isValid ?
                        <Three
                            isLoadingSend={isLoadingSend}
                            handleSubmit={handleSubmit}
                            errorMessage={errorMessage}
                            token={token}
                            SetErrorMessage={SetErrorMessage}

                        />
                        :
                        <div className={styles.token}> Token is not valid </div>
                    }</div>}
            </div>
        </div >
    )
}

export default ResetPassword

interface ThreeProps {
    isLoadingSend: boolean,
    handleSubmit: any
    errorMessage: string,
    SetErrorMessage: any
    token: string | undefined
}

const Three: FC<ThreeProps> = (
    { isLoadingSend,
        handleSubmit,
        errorMessage,
        SetErrorMessage,
        token }
) => {

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const Send = () => {
        if (password !== confirmPassword) return SetErrorMessage("Passwords do not match")
        const data = {
            password,
            token
        }
        handleSubmit(data)
        SetErrorMessage("")

    }
    return (
        <main className={styles.main}>
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
                    value={password}
                    error={false}
                    onChange={(value) => setPassword(value)}
                />
                <InputPassword
                    placeholder={"Confirm password"}
                    label={"Confirm password"}
                    value={confirmPassword}
                    error={false}
                    onChange={(value) => setConfirmPassword(value)}
                />
            </div>
            <p className={styles.error}>
                {errorMessage}
            </p>
            <div className={styles.confirm}>
                <button
                    onClick={Send}
                    className={styles.btn}>
                    {
                        isLoadingSend ? "Loading..." : "Send link to email"
                    }
                </button>
            </div>
        </main>)
}