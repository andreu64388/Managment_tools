import React, { FC, memo } from 'react';
//@ts-ignore
import styles from './Loading.module.scss';
import Loading from '../Loading'

const LoadingApp: FC = () => {
   return (
      <div className={styles.loader}>
         <Loading />
      </div>
   );
};

export default memo(LoadingApp)