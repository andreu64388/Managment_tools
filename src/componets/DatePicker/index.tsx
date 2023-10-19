import React, {FC, useState} from "react";
import {format} from "date-fns";
import {Calendar} from "../Calendar";
//@ts-ignore
import styles from "./DatePicker.module.scss";
//@ts-ignore
import calendar from "../../assets/images/calendar.svg";


interface DatePickerProps {
    initialDate: Date | null;
    onChange: (date: Date | null) => void;
}

export const DatePicker: FC<DatePickerProps> = ({initialDate, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

    const toggleCalendar = () => {
        setIsOpen(!isOpen);
    };

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        onChange(date);
        toggleCalendar();
    };

    return (
        <div className={styles.datePicker}>
            <div className={styles.text}>Or choose a specific date:</div>
            <div className={styles.selectedDate} onClick={toggleCalendar}>
                <img src={calendar} alt="calendar"/>
                <p className={styles.date}>
                    {selectedDate ? format(selectedDate, "MM/dd/yyyy") :
                        <span style={{color: "gray"}}>Select date</span>}
                </p>
            </div>
            {isOpen && (
                <div className={styles.calendarContainer}>
                    <Calendar selectedDate={selectedDate || new Date()} onChange={handleDateChange}/>
                </div>
            )}
        </div>
    );
};
