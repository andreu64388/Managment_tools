import { FC } from 'react';
//@ts-ignore
import styles from './ErrorComponent.module.scss';
import memo from './../../pages/Home/index';

interface ErrorComponentProps {
   message: string;
}

const ErrorComponent = ({ message }:ErrorComponentProps) => {
   return (
      <div className={styles.errorContainer}>
         <div className={styles.errorMessage}>
            {message}
         </div>
      </div>
   );
};

export default memo(ErrorComponent);
