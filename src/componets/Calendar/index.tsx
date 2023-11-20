import React, { FC, useState, memo, useEffect } from "react";
import {
    addDays,
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDaysInMonth,
    getMonth,
    getYear,
    isSameDay,
    isSameMonth,
    isToday,
    startOfMonth,
    subMonths,
} from "date-fns";
//@ts-ignore
import styles from "./Calendar.module.scss";

interface CalendarProps {
    selectedDate: Date;
    onChange: (date: Date) => void;
}

const Calendar: FC<CalendarProps> = ({ selectedDate, onChange }) => {
    const initialDate = new Date();
    const [currentDate, setCurrentDate] = useState<any>(selectedDate);
    const daysPerRow = 7;
    const maxYears = 5;

    useEffect(() => {

        setCurrentDate(selectedDate);
    }, [selectedDate]);

    const nextMonth = () => {
        setCurrentDate((prevDate: any) => {
            const newDate = addMonths(prevDate, 1);
            const maxAllowedDate = addMonths(initialDate, maxYears * 12);
            return newDate > maxAllowedDate ? maxAllowedDate : newDate;
        });
    };

    const prevMonth = () => {
        setCurrentDate((prevDate: any) => {
            const newDate = subMonths(prevDate, 1);
            return newDate < initialDate ? initialDate : newDate;
        });
    };

    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    const firstDayOfWeek = start.getDay();
    const lastDayOfWeek = end.getDay();

    const daysBefore = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    const daysAfter = daysPerRow - 1 - lastDayOfWeek;

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
                    {Array.from({ length: maxYears * 12 }, (_, index) => {
                        const year = Math.floor(index / 12) + getYear(initialDate);
                        const month = index % 12;
                        return (
                            <option
                                key={`${year}-${month + 1}`}
                                value={`${year}-${month + 1}`}
                            >
                                {format(new Date(year, month, 1), "MMMM yyyy")}
                            </option>
                        );
                    })}
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
                {Array.from({ length: daysBefore }, (_, i) => (
                    <div
                        key={`before-month-${i}`}
                        className={`${styles.date} ${styles["other-month"]}`}
                    >
                        {format(addDays(start, -daysBefore + i), "d")}
                    </div>
                ))}

                {days.map((date) => (
                    <div
                        key={date.toString()}
                        className={`${styles.date} ${isSameMonth(date, currentDate) ? styles["current-month"] : styles["other-month"]
                            } ${isSameDay(date, selectedDate) ? styles.selected : ""
                            } ${isToday(date) ? styles.today : ""}`}
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

export default memo(Calendar);
