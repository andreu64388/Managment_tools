import React, { ChangeEvent, memo } from "react";
//@ts-ignore
import styles from "./Input.module.scss";

interface InputProps {
    label: any;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: boolean;
    type?: string;
    marginTop?: string;
    maxLength?: number
}

const Input: React.FC<InputProps> = memo(({ label, value, onChange, placeholder, error, type, marginTop, maxLength }) => {
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
                maxLength={maxLength}
            />
        </div>
    );
});

export default Input;
