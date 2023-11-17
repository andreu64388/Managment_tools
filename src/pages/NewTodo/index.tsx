import { FC, useEffect, useState } from "react";
import { addDays, format, set } from "date-fns";
//@ts-ignore
import styles from "./NewTodo.module.scss"
import { DatePicker, Loading, Step, ToDoItem, Tooltip } from "../../componets";
//@ts-ignore
import arr from "../../assets/images/arr.svg"
import usePageSettings from "../../utils/hooks/usePageSettings";
import { useTemplates } from "../../utils/hooks/useTemplates";
import { useCreatePlan } from "../../utils/hooks/useCreatePlan";

export const NewTodoPage: FC = () => {
    usePageSettings('New campaign');
    const [step, setStep] = useState<number>(1);
    const [templateId, setTemplateId] = useState<number>(0);
    const {
        errorMessage,
        isLoading,
        handleSubmit } = useCreatePlan();



    const incrementStep = (data: any) => {
        setTemplateId(data.id);
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


interface StepFirstProps {
    incrementStep: any
}

const StepFirst: FC<StepFirstProps> = ({ incrementStep }) => {


    const [offsetLoad, setoffsetLoad] = useState(0);
    const { templates, isLoading, errorMessage, isDataAll } = useTemplates({
        offset: offsetLoad,
        limit: 9,
    });

    const LoadMore = () => {
        setoffsetLoad((prevCount) => prevCount + 9);
    };

    const Click = (data: any) => {
        incrementStep(data);
    }


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
                        return <ToDoItem Click={Click} data={item} />
                    }
                    )
                }

            </div>
            {isDataAll && (
                <button
                    className={styles.loadMore}
                    onClick={LoadMore}
                    disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Load more'}
                </button>)}
        </>
    )
}

interface StepTwoProps {
    decrementStep: () => void;
    createPlan: (selectedDate: Date | null) => void;
    isLoading: boolean;
    errorMessage: string | null;
}

const StepTwo: FC<StepTwoProps> = ({ decrementStep, createPlan, isLoading, errorMessage }) => {
    const Click = () => {
        decrementStep();
    };

    const [selectedWeek, setSelectedWeek] = useState(0);

    const currentDate = new Date();
    const selectedDateWeek = addDays(currentDate, selectedWeek * 7);
    const [selectedDate, setSelectedDate] = useState<any>(null);

    const [selectedDateClone, setSelectedDateClone] = useState<any>(null);

    const handleButtonClick = (week: number) => {
        setSelectedWeek(week);
        setSelectedDate(selectedDateWeek);
    };

    const handleDateChange = (date: any) => {
        setSelectedWeek(0)
        setSelectedDate(date);

    };


    const clickHandler = () => {

        if (!isLoading) {
            if (selectedDate !== selectedDateClone) {
                createPlan(selectedDate);
                setSelectedDateClone(selectedDate);
            }
        }

    };

    return (
        <div className={styles.step_two}>
            <div className={styles.up}>
                <div className={styles.left}>
                    {[1, 2, 3, 4].map((week) => (
                        <button
                            key={week}
                            className={`${styles.btn} ${selectedWeek === week ? styles.selected : ''}`}
                            onClick={() => handleButtonClick(week)}
                        >
                            {`${week === 1 ? 'First' : week === 2 ? 'Second' : week === 3 ? 'Third' : 'Fourth'} week of ${format(
                                currentDate,
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
                    <DatePicker initialDate={selectedDate}
                        onChange={handleDateChange}
                        errorMessage={errorMessage}
                    />
                </div>
            </div>
            <div className={styles.down}>
                <button className={styles.btn_back} onClick={Click}>
                    <div className={styles.img}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M20.2498 12.0002C20.2498 12.1991 20.1708 12.3898 20.0302 12.5305C19.8895 12.6711 19.6987 12.7502 19.4998 12.7502H6.30983L11.7798 18.2202C11.8535 18.2888 11.9126 18.3716 11.9536 18.4636C11.9946 18.5556 12.0166 18.6549 12.0184 18.7556C12.0202 18.8563 12.0017 18.9564 11.964 19.0498C11.9262 19.1431 11.8701 19.228 11.7989 19.2992C11.7276 19.3704 11.6428 19.4266 11.5494 19.4643C11.456 19.502 11.356 19.5205 11.2553 19.5187C11.1546 19.517 11.0553 19.4949 10.9633 19.4539C10.8713 19.4129 10.7885 19.3538 10.7198 19.2802L3.96983 12.5302C3.82938 12.3895 3.75049 12.1989 3.75049 12.0002C3.75049 11.8014 3.82938 11.6108 3.96983 11.4702L10.7198 4.72015C10.7885 4.64647 10.8713 4.58736 10.9633 4.54637C11.0553 4.50538 11.1546 4.48334 11.2553 4.48156C11.356 4.47979 11.456 4.49831 11.5494 4.53603C11.6428 4.57375 11.7276 4.6299 11.7989 4.70112C11.8701 4.77233 11.9262 4.85717 11.964 4.95056C12.0017 5.04394 12.0202 5.14397 12.0184 5.24468C12.0166 5.34538 11.9946 5.44469 11.9536 5.53669C11.9126 5.62869 11.8535 5.71149 11.7798 5.78015L6.30983 11.2502H19.4998C19.6987 11.2502 19.8895 11.3292 20.0302 11.4698C20.1708 11.6105 20.2498 11.8012 20.2498 12.0002Z"
                                fill="#FF385C" />
                        </svg>
                    </div>
                    <p className={styles.text}>Back to templates</p>
                </button>
                <button onClick={clickHandler} className={styles.btn_next}>
                    <div className={styles.img}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M5.10595 12.9701C5.22735 13.1273 5.28141 13.3262 5.25629 13.5233C5.23117 13.7203 5.12891 13.8993 4.97195 14.0211C4.60711 14.3019 4.32711 14.6782 4.16296 15.1083C3.99882 15.5384 3.95693 16.0056 4.04195 16.4581C4.49442 16.5431 4.9616 16.5012 5.39173 16.3371C5.82186 16.1729 6.19816 15.8929 6.47895 15.5281C6.53853 15.4483 6.61341 15.3811 6.69921 15.3306C6.78502 15.28 6.88003 15.2471 6.9787 15.2336C7.07738 15.2202 7.17775 15.2265 7.27395 15.2523C7.37015 15.278 7.46025 15.3227 7.539 15.3837C7.61776 15.4446 7.68358 15.5207 7.73264 15.6073C7.78169 15.694 7.813 15.7896 7.82472 15.8885C7.83644 15.9874 7.82836 16.0876 7.80092 16.1833C7.77349 16.2791 7.72727 16.3684 7.66495 16.4461C7.15249 17.1108 6.4437 17.5972 5.63918 17.8363C4.83465 18.0754 3.97526 18.055 3.18295 17.7781C3.07637 17.7409 2.97956 17.6801 2.89974 17.6003C2.81992 17.5205 2.75915 17.4236 2.72195 17.3171C2.44487 16.5248 2.42443 15.6653 2.66354 14.8608C2.90265 14.0562 3.38914 13.3474 4.05395 12.8351C4.21124 12.7134 4.41042 12.6591 4.6077 12.6842C4.80498 12.7094 4.9842 12.8118 5.10595 12.9691V12.9701Z"
                                fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M6.252 11.9999C6.90707 12.8379 7.66198 13.5928 8.5 14.2479V18.2499C8.5 18.6639 8.836 18.9999 9.25 18.9999C10.0276 19 10.7944 18.8189 11.4897 18.4707C12.185 18.1226 12.7895 17.6171 13.2551 16.9945C13.7208 16.3718 14.0349 15.6491 14.1724 14.8838C14.3098 14.1185 14.2669 13.3317 14.047 12.5859C15.7706 11.3586 17.1681 9.72871 18.1179 7.83805C19.0678 5.94739 19.5412 3.85325 19.497 1.73786C19.4932 1.54412 19.4145 1.3594 19.2775 1.22238C19.1405 1.08536 18.9557 1.00669 18.762 1.00286C16.6464 0.958476 14.5521 1.43182 12.6613 2.38169C10.7704 3.33155 9.14036 4.72916 7.913 6.45286C7.16725 6.23315 6.38055 6.19038 5.61537 6.32792C4.8502 6.46547 4.12764 6.77956 3.5051 7.24523C2.88255 7.7109 2.37717 8.31532 2.02911 9.01049C1.68104 9.70566 1.49987 10.4724 1.5 11.2499C1.501 11.6639 1.837 11.9999 2.251 11.9999H6.252ZM13.5 8.99986C14.0304 8.99986 14.5391 8.78914 14.9142 8.41407C15.2893 8.039 15.5 7.53029 15.5 6.99986C15.5 6.46942 15.2893 5.96072 14.9142 5.58564C14.5391 5.21057 14.0304 4.99986 13.5 4.99986C12.9696 4.99986 12.4609 5.21057 12.0858 5.58564C11.7107 5.96072 11.5 6.46942 11.5 6.99986C11.5 7.53029 11.7107 8.039 12.0858 8.41407C12.4609 8.78914 12.9696 8.99986 13.5 8.99986Z"
                                fill="white" />
                        </svg>
                    </div>
                    <p>{isLoading ? 'Loading...' : 'Launch campaign'}</p>
                </button>
            </div>
        </div>
    );
};

