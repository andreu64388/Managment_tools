

import React from 'react';
//@ts-ignore
import styles from "./TimeChoise.module.scss"
enum TimeUnit {
   Minutes = 'minutes',
   Hours = 'hours',
   Days = 'days',
}

interface TimeChoiceProps {
   value: TimeUnit;
   onChange: (unit: TimeUnit) => void;
   text?: string
}

const TimeChoice: React.FC<TimeChoiceProps> = ({ value, onChange, text }) => {
   return (
      <div className={styles.selectWrapper}>
         <label className={styles.timeChoice}>
            {text ? text : ' Time Unit:'}
         </label>
         <select
            className={styles.timeChoiceSelect}
            value={value}
            onChange={(e) => onChange(e.target.value as TimeUnit)}
         >
            <option className={styles.option} value={TimeUnit.Minutes}>
               Minutes
            </option>
            <option className={styles.option} value={TimeUnit.Hours}>
               Hours
            </option>
            <option className={styles.option} value={TimeUnit.Days}>
               Days
            </option>
         </select>
      </div>
   );
};

export default TimeChoice;
