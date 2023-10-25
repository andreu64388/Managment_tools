import React, { ChangeEvent, FC, useState } from "react";
//@ts-ignore
import styles from "./Input.module.scss";

interface InputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: boolean;
}

export  const Input: FC<InputProps> = ({ label, value, onChange,placeholder,error }) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        onChange(value);
    };

    return (
        <div className={`${styles.inputContainer} ${error ? styles.error : ""}`}>
            <label className={styles.label}>{label}</label>
            <input
                placeholder={placeholder}
                type="text"
                value={value}
                onChange={handleInputChange}
                className={styles.input}
            />
        </div>
    );
};

