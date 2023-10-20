import React, { FC, useState } from "react";
import {
    addDays,
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDaysInMonth,
    getMonth,
    getYear,
    isSameMonth,
    isSameDay,
    isToday, // Добавлен импорт
    startOfMonth,
    subMonths,
} from "date-fns";
//@ts-ignore
import styles from "./Calendar.module.scss";

interface CalendarProps {
    selectedDate: Date;
    onChange: (date: Date) => void;
}

export const Calendar: FC<CalendarProps> = ({ selectedDate, onChange }) => {
    const initialDate = new Date();
    const [currentDate, setCurrentDate] = useState(initialDate);
    const daysPerRow = 7; // Количество дней в одном ряду

    const nextMonth = () => {
        setCurrentDate((prevDate) => {
            const newDate = addMonths(prevDate, 1);
            const maxAllowedDate = addMonths(initialDate, 3);
            return newDate > maxAllowedDate ? maxAllowedDate : newDate;
        });
    };

    const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    const currentYear = getYear(initialDate);
    const nextMonthDate = addMonths(currentDate, 1);
    const nextYear = getYear(nextMonthDate);

    const firstDayOfWeek = start.getDay();
    const lastDayOfWeek = end.getDay();

    const daysInMonth = getDaysInMonth(currentDate);
    const daysBefore = firstDayOfWeek;
    const daysAfter = daysPerRow - 1 - lastDayOfWeek;

    const months = Array.from({ length: 12 }, (_, i) => {
        const date = new Date(currentYear, i, 1);
        return (
            <option key={i} value={`${date.getFullYear()}-${date.getMonth() + 1}`}>
                {format(date, "MMMM yyyy")}
            </option>
        );
    });

    const handleDayClick = (date: Date) => {
        if (isSameMonth(date, currentDate)) {
            onChange(date);
        } else if (date > currentDate) {
            nextMonth();
        } else {
            prevMonth();
        }
    };

    return (
        <div className={styles.calendar}>
            <div className={styles["date-picker"]}>
                <select
                    value={`${getYear(currentDate)}-${getMonth(currentDate) + 1}`}
                    onChange={(e) => {
                        const [year, month] = e.target.value.split("-");
                        setCurrentDate(new Date(parseInt(year), parseInt(month) - 1, 1));
                    }}
                >
                    {months}
                </select>
                <div className={styles.buttons}>
                    <button onClick={prevMonth}>&lt;</button>
                    <button onClick={nextMonth}>&gt;</button>
                </div>
            </div>
            <div className={styles["days-of-week"]}>
                {daysOfWeek.map((day, index) => (
                    <div key={index} className={styles.day}>
                        {day}
                    </div>
                ))}
            </div>
            <div className={styles["calendar-dates"]}>
                {days.map((date) => (
                    <div
                        key={date.toString()}
                        className={`${styles.date} ${isSameMonth(date, currentDate) ? styles["current-month"] : styles["other-month"]
                        } ${isSameDay(date, selectedDate) ? styles.today : ""
                        } ${isToday(date) ? styles.selected : ""}`}
                        onClick={() => handleDayClick(date)}
                    >
                        {format(date, "d")}
                    </div>
                ))}
                {Array.from({ length: daysAfter }, (_, i) => (
                    <div
                        key={`after-month-${i}`}
                        className={`${styles.date} ${styles["other-month"]}`}
                    >
                        {format(addDays(end, i + 1), "d")}
                    </div>
                ))}
            </div>
        </div>
    );
};
