// LoadingDown.tsx
import React, { FC, memo, useState, useEffect } from 'react';
//@ts-ignore
import styles from './LoadingDown.module.scss';

const LoadingDown: FC<{ isVisible: boolean }> = ({ isVisible }) => {
   const [visible, setVisible] = useState<boolean>(false);

   useEffect(() => {
      setVisible(isVisible);
   }, [isVisible]);

   return (
      <div className={`${styles.loadingDown} ${visible ? styles.visibleUp : styles.visibleDown}`}>
         <div className={styles.loadingDown__text}>
            Loading...
         </div>
      </div>
   );
};

export default memo(LoadingDown);
