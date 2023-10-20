import React, { FC, useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Calendar } from "../Calendar";
//@ts-ignore
import styles from "./DatePicker.module.scss";
//@ts-ignore
import calendar from "../../assets/images/calendar.svg";

interface DatePickerProps {
    initialDate: Date | null;
    onChange: (date: Date | null) => void;
}

export const DatePicker: FC<DatePickerProps> = ({ initialDate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSelectingDate, setIsSelectingDate] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");
    const calendarRef = useRef<HTMLDivElement | null>(null);

    const toggleCalendar = () => {
        setIsOpen(!isOpen);
        setIsSelectingDate(true);
    };

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        setInputValue(format(date, "MM/dd/yyyy"));
        onChange(date);
        setIsSelectingDate(false);
        toggleCalendar();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setInputValue(text);
        setError("");

        const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        if (regex.test(text)) {
            const parsedDate = new Date(text);
            handleDateChange(parsedDate);
        } else {
            setError("Invalid date format");
        }
    };

    const handleCalendarClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Предотвращаем распространение события до родительских элементов
    };

    const handleCalendarMouseEnter = () => {
        setIsSelectingDate(true); // Когда пользователь наводит курсор на календарь, устанавливаем isSelectingDate в true
    };

    const handleCalendarMouseLeave = () => {
        setIsSelectingDate(false); // Когда пользователь уводит курсор с календаря, устанавливаем isSelectingDate в false
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!isSelectingDate && calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isSelectingDate]);

    return (
        <>
            <div className={styles.datePicker}>
                <div className={styles.text}>Or choose a specific date:</div>
                <div
                    className={`${styles.selectedDate} ${error && styles.error}`}
                    onClick={toggleCalendar}
                    ref={calendarRef}
                >
                    <img src={calendar} alt="calendar" />
                    <p className={styles.date}>
                        <input
                            type="text"
                            className={error && styles.inputError}
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Select a date"
                        />
                    </p>
                </div>

                {isOpen && (
                    <div
                        className={styles.calendarContainer}
                        onClick={handleCalendarClick}
                        onMouseEnter={handleCalendarMouseEnter}
                        onMouseLeave={handleCalendarMouseLeave}
                        ref={calendarRef}
                    >
                        <Calendar selectedDate={selectedDate || new Date()} onChange={handleDateChange} />
                    </div>
                )}
            </div>
            <div className={styles.main_error}>
                {error && <div className={styles.error}>{error}</div>}
            </div>
        </>
    );
};
