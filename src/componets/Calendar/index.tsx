import React, { FC, useState, memo, useEffect, useMemo } from "react";
import {
    addDays,
    addMonths,
    addMinutes,
    differenceInDays,
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
    subDays,
} from "date-fns";
//@ts-ignore
import styles from "./Calendar.module.scss";

interface CalendarProps {
    selectedDate: Date | null | any;
    onChange: (date: Date) => void;
    prepTime: number;
}

const Calendar: FC<CalendarProps> = ({ selectedDate, onChange, prepTime }) => {
    const initialDate = new Date();
    const initialViewDate = prepTime ? addDays(initialDate, prepTime) : initialDate;
    const [currentDate, setCurrentDate] = useState<any>(initialViewDate);
    const daysPerRow = 7;
    const maxYears = 5;

    useEffect(() => {

        setCurrentDate(selectedDate);
    }, [selectedDate]);;

    const nextMonth = useMemo(
        () => () => {
            setCurrentDate((prevDate: any) => {
                const newDate = addMonths(prevDate, 1);
                const maxAllowedDate = addMonths(initialDate, maxYears * 12);
                const daysInMonth = getDaysInMonth(newDate);

                // Если текущая дата близка к концу месяца, переходим на следующий месяц
                return daysInMonth - newDate.getDate() < daysPerRow
                    ? addDays(newDate, daysInMonth - newDate.getDate() + 1)
                    : newDate;
            });
        },
        [daysPerRow, initialDate, maxYears]
    );

    const prevMonth = useMemo(
        () => () => {
            setCurrentDate((prevDate: any) => {
                const newDate = subMonths(prevDate, 1);
                const daysInMonth = getDaysInMonth(newDate);

                return newDate.getDate() <= daysPerRow
                    ? subDays(newDate, newDate.getDate() - 1)
                    : newDate;
            });
        },
        [daysPerRow]
    );

    const isDateDisabled = (date: Date) => {
        const today = new Date();
        const prepTimeDate = addMinutes(today, prepTime);
        const prepTimeDateMinusOneDay = subDays(prepTimeDate, 1);

        return date < prepTimeDateMinusOneDay;
    };

    const handleDayClick = (date: Date) => {
        if (!isDateDisabled(date)) {
            onChange(date);
        }
    };

    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);

    const days = [];
    for (let i = 0; i < getDaysInMonth(currentDate); i++) {
        days.push(addDays(start, i));
    }

    const firstDayOfWeek = start.getDay();
    const lastDayOfWeek = end.getDay();

    const daysBefore = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    const daysAfter = daysPerRow - 1 - lastDayOfWeek;

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
                            <option key={`${year}-${month + 1}`} value={`${year}-${month + 1}`}>
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
                        className={`${styles.date} ${isSameMonth(date, currentDate)
                            ? styles["current-month"]
                            : styles["other-month"]
                            } ${isSameDay(date, selectedDate) ? styles.selected : ""} ${isToday(date) ? styles.today : ""
                            } ${isDateDisabled(date) ? styles.disabled : ""}`}
                        onClick={() => handleDayClick(date)}
                    >
                        {format(date, "d")}
                    </div>
                ))}

            </div>
        </div>
    );
};

export default memo(Calendar);
