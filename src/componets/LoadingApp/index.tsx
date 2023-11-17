import React, { FC } from 'react';
//@ts-ignore
import styles from './Loading.module.scss';

export const LoadingApp: FC = () => {
   return (
      <div className={styles.loader}>
         <div className={styles.spinner}></div>
      </div>
   );
};

