import React, { FC, memo, useEffect, useRef, useState } from "react";
import { addMinutes, format, isAfter } from "date-fns";
import Calendar from "../Calendar";
//@ts-ignore
import styles from "./DatePicker.module.scss";
//@ts-ignore
import calendar from "../../assets/images/calendar.svg";

interface DatePickerProps {
    initialDate: Date | any;
    onChange: any;
    errorMessage: string | null;
    prepTime: number
}

const DatePicker: FC<DatePickerProps> = ({ initialDate, onChange, errorMessage, prepTime }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSelectingDate, setIsSelectingDate] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | null>("");
    const calendarRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        setError(errorMessage)
    }, [errorMessage])


    useEffect(() => {
        setSelectedDate(initialDate)
        setInputValue(format(initialDate, "MM/dd/yyyy"))
    }, [initialDate]
    )

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
        e.stopPropagation();
    };

    const handleCalendarMouseEnter = () => {
        setIsSelectingDate(true);
    };

    const handleCalendarMouseLeave = () => {
        setIsSelectingDate(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!isSelectingDate) {
                if (
                    calendarRef.current &&
                    !calendarRef.current.contains(event.target as Node)

                ) {
                    setIsOpen(false);
                }
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isSelectingDate]);

    return (
        <div className={styles.main}>
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
                        <Calendar
                            prepTime={prepTime}
                            selectedDate={selectedDate}
                            onChange={handleDateChange} />
                    </div>
                )}
            </div>
            <div className={styles.main_error}>
                {error && <div className={styles.error}>{error}</div>}
            </div>
        </div>
    );
};


export default memo(DatePicker)