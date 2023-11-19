import React, { ChangeEvent, memo } from "react";
//@ts-ignore
import styles from "./Input.module.scss";

interface InputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: boolean;
    type?: string;
    marginTop?: string;
}

const Input: React.FC<InputProps> = memo(({ label, value, onChange, placeholder, error, type, marginTop }) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        onChange(value);
    };

    return (
        <div className={`${styles.inputContainer} ${error ? styles.error : ""}`}>
            <label className={styles.label}>{label}</label>
            <input
                style={{ marginTop: marginTop }}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={handleInputChange}
                className={styles.input}
            />
        </div>
    );
});

export default Input;
