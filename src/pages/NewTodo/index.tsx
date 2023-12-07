import { FC, memo, useEffect, useRef, useState } from "react";
import { addDays, addMinutes, differenceInDays, format, getDaysInMonth, getWeek, isBefore, startOfMonth } from "date-fns";
//@ts-ignore
import styles from "./NewTodo.module.scss"
import { DatePicker, Loading, Step, ToDoItem, Tooltip } from "../../componets";
//@ts-ignore
import arr from "../../assets/images/arr.svg"
//@ts-ignore
import rockAdd from "../../assets/images/rockAdd.svg"
//@ts-ignore
import backAdd from "../../assets/images/backAdd.svg"
import usePageSettings from "../../utils/hooks/usePageSettings";
import { useTemplates } from "../../utils/hooks/useTemplates";
import { useCreatePlan } from "../../utils/hooks/useCreatePlan";

const NewTodoPage: FC = () => {
    usePageSettings('New campaign');
    const [step, setStep] = useState<number>(1);
    const [templateId, setTemplateId] = useState<string>("");
    const [selectedData, setSelectedData] = useState<any>();

    const {
        errorMessage,
        isLoading,
        handleSubmit } = useCreatePlan();

    const incrementStep = (data: any) => {
        setTemplateId(data.id);

        setSelectedData(data.prepTime)

        if (step < 2) {
            setStep(step + 1);
        }
    };

    const decrementStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }

    };
    const createPlan = (date: any) => {


        const plan = {
            deadline: date,
            templateId
        }

        handleSubmit(plan)
    }



    return (
        <div className={styles.newTodo}>
            <div className={styles.content}>
                <p className={styles.title}> Create a campaign</p>
                <Step step={step} />

                {
                    step === 1 ? <StepFirst incrementStep={incrementStep} /> :

                        <StepTwo
                            selectedData={selectedData}
                            createPlan={createPlan}
                            isLoading={isLoading}
                            decrementStep={decrementStep}
                            errorMessage={errorMessage}
                        />
                }

            </div>
        </div>
    );
};
export default memo(NewTodoPage);

interface StepFirstProps {
    incrementStep: any
}

const StepFirst: FC<StepFirstProps> = memo(({ incrementStep }) => {


    const [offsetLoad, setOffsetLoad] = useState<number>(0);
    const { templates, isLoading, errorMessage, isDataAll, loadingMore, LoadMore } = useTemplates({
        offset: offsetLoad,
        limit: 9,
    });

    const Click = (data: any) => {
        incrementStep(data);
    }

    const loadMoreTriggerRef = useRef<HTMLDivElement>(null);


    const loadMoreData = () => {
        if (!loadingMore) {
            setOffsetLoad((prevCount: number) => prevCount + 9);
            LoadMore();
        }
    };

    const handleScroll = () => {
        if (loadMoreTriggerRef.current) {
            const { top, height } = loadMoreTriggerRef.current.getBoundingClientRect();
            if (top + height <= window.innerHeight) {
                loadMoreData();
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    if (isLoading) {
        return <Loading />
    }
    if (errorMessage) {
        return <div>{errorMessage}</div>
    }


    return (
        <>
            <div className={styles.blocks}>
                {
                    templates?.map((item: any) => {
                        return <ToDoItem
                            key={item.id}
                            Click={Click}
                            data={item} />
                    }
                    )
                }

            </div>
            {isDataAll && (
                <div className={styles.loadMore} ref={loadMoreTriggerRef}>
                    {loadingMore ? <Loading /> : null}
                </div>
            )}
        </>
    )
})

interface StepTwoProps {
    selectedData: any;
    decrementStep: () => void;
    createPlan: (selectedDate: Date | null) => void;
    isLoading: boolean;
    errorMessage: string | null;
}

const StepTwo: FC<StepTwoProps> = memo(({ decrementStep, createPlan, isLoading, errorMessage, selectedData }) => {
    const [selectedWeek, setSelectedWeek] = useState(0);
    const [selectedDate, setSelectedDate] = useState<Date | null>(addMinutes(new Date(), selectedData));
    const [selectedDateClone, setSelectedDateClone] = useState<Date | null>(null);
    const [visibleWeeks, setVisibleWeeks] = useState<number[]>([]);
    const [month, setMonth] = useState<Date>(new Date());
    useEffect(() => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();

        const newVisibleWeeks = [1, 2, 3, 4].filter((week) => {
            const prepTimeDate = addMinutes(currentDate, selectedData);
            const dayOfMonth = prepTimeDate.getDate();
            return dayOfMonth < week * 7;
        });

        setVisibleWeeks(newVisibleWeeks);
    }, [selectedData]);

    const handleButtonClick = (week: number) => {
        const test = startOfMonth(month);
        const startOfWeek = addDays(test, week * 7 - 1);
        setSelectedWeek(week);
        setSelectedDate(startOfWeek);
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedWeek(0);
        setSelectedDate(date);
    };

    const Click = () => {
        decrementStep();
    };

    const getMonthUp = (date: Date) => {
        const currentDate = new Date();
        setSelectedWeek(0)
        setMonth(date);

        if (date.getMonth() === currentDate.getMonth()) {

            const newVisibleWeeks = [1, 2, 3, 4].filter((week) => {
                const prepTimeDate = addMinutes(currentDate, selectedData);
                const dayOfMonth = prepTimeDate.getDate();
                return dayOfMonth < week * 7;
            });

            setVisibleWeeks(newVisibleWeeks);
        } else {

            setVisibleWeeks([1, 2, 3, 4]);
        }
    };


    const clickHandler = () => {
        if (!isLoading && selectedDate !== selectedDateClone && selectedDate) {
            createPlan(selectedDate);
            setSelectedDateClone(selectedDate);
        }
    };

    return (
        <div className={styles.step_two}>
            <div className={styles.up}>
                <div className={styles.left}>
                    {visibleWeeks.map((week) => (
                        <button
                            key={week}
                            className={`${styles.btn} ${selectedWeek === week ? styles.selected : ''}`}
                            onClick={() => handleButtonClick(week)}
                        >
                            {`${week === 1 ? 'First' : week === 2 ? 'Second' : week === 3 ? 'Third' : 'Fourth'} week of ${format(
                                new Date(month),
                                'MMMM'
                            )}`}
                            <div className={styles.img}>
                                <img src={arr} alt="arr" />
                            </div>
                        </button>
                    ))}
                    <Tooltip />
                </div>
                <div className={styles.line}></div>
                <div className={styles.right}>
                    <DatePicker
                        initialDate={selectedDate}
                        onChange={handleDateChange}
                        errorMessage={errorMessage}
                        prepTime={selectedData}
                        getMonthUp={getMonthUp}
                    />
                </div>
            </div>
            <div className={styles.down}>
                <button className={styles.btn_back} onClick={Click}>
                    <div className={styles.img}>
                        <img src={backAdd} alt="backAdd" />
                    </div>
                    <p className={styles.text}>Back to templates</p>
                </button>
                <button onClick={clickHandler} className={styles.btn_next}>
                    <div className={styles.img}>
                        <img src={rockAdd} alt="rockAdd" />
                    </div>
                    <p>{isLoading ? 'Loading...' : 'Launch campaign'}</p>
                </button>
            </div>
        </div>
    );
});
