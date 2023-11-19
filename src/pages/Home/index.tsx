import { FC, memo } from 'react';
//@ts-ignore
import styles from './Home.module.scss';
import usePageSettings from '../../utils/hooks/usePageSettings';
import { FinishedTasks, UnfinishedTasks } from '../../componets';

const HomePage: FC = () => {
    usePageSettings('Home');
    return (
        <div className={styles.home}>
            <UnfinishedTasks />
            <FinishedTasks />
        </div>
    );
};

export default memo(HomePage);
