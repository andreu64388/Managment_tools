import React, {FC, useState} from 'react';
//@ts-ignore
import styles from './Accordion.module.scss';
import {ToDoItemDash} from '../ToDoItemDash';

type AccordionProps = {
    title: string;
    description: string;
};

export const Accordion: FC<AccordionProps> = ({title, description}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const accordionIcon = isOpen ? (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.4701 8.22007C11.6107 8.07962 11.8013 8.00073 12.0001 8.00073C12.1988 8.00073 12.3895 8.07962 12.5301 8.22007L20.0301 15.7201C20.1038 15.7887 20.1629 15.8715 20.2039 15.9635C20.2449 16.0555 20.2669 16.1548 20.2687 16.2556C20.2705 16.3563 20.2519 16.4563 20.2142 16.5497C20.1765 16.6431 20.1203 16.7279 20.0491 16.7991C19.9779 16.8703 19.8931 16.9265 19.7997 16.9642C19.7063 17.0019 19.6063 17.0204 19.5056 17.0187C19.4049 17.0169 19.3056 16.9948 19.2136 16.9539C19.1216 16.9129 19.0388 16.8538 18.9701 16.7801L12.0001 9.81007L5.03009 16.7801C4.88792 16.9126 4.69987 16.9847 4.50557 16.9812C4.31127 16.9778 4.12588 16.8991 3.98847 16.7617C3.85106 16.6243 3.77234 16.4389 3.76892 16.2446C3.76549 16.0503 3.83761 15.8622 3.97009 15.7201L11.4701 8.22007Z"
                fill="black"
            />
        </svg>
    ) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
        >
            <path
                transform="rotate(180 12 12.5)"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.4701 8.22007C11.6107 8.07962 11.8013 8.00073 12.0001 8.00073C12.1988 8.00073 12.3895 8.07962 12.5301 8.22007L20.0301 15.7201C20.1038 15.7887 20.1629 15.8715 20.2039 15.9635C20.2449 16.0555 20.2669 16.1548 20.2687 16.2556C20.2705 16.3563 20.2519 16.4563 20.2142 16.5497C20.1765 16.6431 20.1203 16.7279 20.0491 16.7991C19.9779 16.8703 19.8931 16.9265 19.7997 16.9642C19.7063 17.0019 19.6063 17.0204 19.5056 17.0187C19.4049 17.0169 19.3056 16.9948 19.2136 16.9539C19.1216 16.9129 19.0388 16.8538 18.9701 16.7801L12.0001 9.81007L5.03009 16.7801C4.88792 16.9126 4.69987 16.9847 4.50557 16.9812C4.31127 16.9778 4.12588 16.8991 3.98847 16.7617C3.85106 16.6243 3.77234 16.4389 3.76892 16.2446C3.76549 16.0503 3.83761 15.8622 3.97009 15.7201L11.4701 8.22007Z"
                fill="black"
            />
        </svg>
    );

    return (
        <div className={styles.accordion}>
            <div className={styles['accordion-header']} onClick={toggleAccordion}>
                <div className={styles.title}>
                    <h1>{title}</h1>
                    <p>Sep 1</p>
                </div>
                <div className={styles.right}>
                    <div className={styles.tasks}>4 tasks</div>
                    <div className={styles['accordion-icon']}>{accordionIcon}</div>
                </div>
            </div>
            <div
                className={styles['accordion-content']}
                style={{
                    maxHeight: isOpen ? '1000px' : '0',
                    opacity: isOpen ? 1 : 0,
                    transition: 'max-height 0.3s ease, opacity 0.3s ease',
                }}
            >
                <ToDoItemDash/>
                <ToDoItemDash/>
                <ToDoItemDash/>
                <ToDoItemDash/>
            </div>
        </div>
    );
};

