import { FC, useState } from "react";
//@ts-ignore
import styles from "./InputPassword.module.scss";
//@ts-ignore
import eye from "../../assets/images/eye.svg"


interface InputPasswordProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: boolean;
}

const InputPassword: FC<InputPasswordProps> = ({ label, value, onChange, placeholder, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className={`${styles.inputContainer} ${error ? styles.error : ""}`}>
            <label className={styles.label}>{label}</label>
            <div className={styles.passwordInputContainer}>
                <input
                    placeholder={placeholder}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={styles.input}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styles.togglePasswordButton}
                >
                    <img
                        src={showPassword ? eye : eye}
                        alt={showPassword ? "Show Password" : "Hide Password"}
                    />
                </button>
            </div>
        </div>
    );
};



export default InputPassword