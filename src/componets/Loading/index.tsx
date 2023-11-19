import { FC } from 'react';
//@ts-ignore
import styles from './Loading.module.scss';
import { memo } from 'react';

const Loading: FC = () => {
   return (
      <div className={styles.loader}>
         <div className={styles.spinner}></div>
      </div>
   );
};

export default memo(Loading)