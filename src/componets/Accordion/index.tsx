import { FC, useState } from 'react';
//@ts-ignore
import styles from './Accordion.module.scss';
//@ts-ignore
import OpenAccordion from '../../assets/images/OpenAccordion.svg';
//@ts-ignore
import CloseAccordion from '../../assets/images/CloseAccordion.svg';
import ToDoItemDash from '../ToDoItemDash';
import { formatDate } from '../../utils/format/format';
import { memo } from 'react';

type AccordionProps = {
    title: string;
    data: any;
    planId: number
    notice: any
};

const Accordion: FC<AccordionProps> = ({ title, data, planId, notice }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.accordion}>
            <div className={styles['accordion-header']} onClick={toggleAccordion}>
                <div className={styles.title}>
                    <h1>{title}</h1>
                    <p>{formatDate(data?.days[0]?.dayNumber)}</p>
                </div>
                <div className={styles.right}>
                    <div className={styles.tasks}>{data?.days?.length} tasks</div>
                    <div className={styles['accordion-icon']}>
                        <img src={isOpen ? OpenAccordion : CloseAccordion} alt="icon" />
                    </div>
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
                {data?.days?.map((el: any,) => (
                    <ToDoItemDash
                        key={`${el.id}-${planId}`}
                        data={el}
                        planId={planId}
                        notice={notice} />
                ))}
            </div>
        </div>
    );
};

export default memo(Accordion)