import { FC, memo, useState } from 'react';
import ToDoItemHoriz from "../ToDoItemHoriz";
//@ts-ignore 
import styles from "./FinishedTasks.module.scss"
import Loading from "../Loading";
import { useGetCompleted } from '../../utils/hooks/useGetCompleted';

const FinishedTasks: FC = () => {
   const [offsetLoad, setOffsetLoad] = useState<number>(0);

   const { plans, isLoading, isDataAll, Delete } = useGetCompleted({
      offset: offsetLoad,
      limit: 5,
   });

   const onLoadMore = () => {
      setOffsetLoad((prevCount) => prevCount + 5);
   }

   const notice = (id: string) => {
      Delete(id)
   }

   if (plans.length === 0 && isLoading) {
      return null
   }

   return (
      <div className={styles.finished}>
         {plans?.length > 0 && (<h1 className={styles.title}>Finished campaigns</h1>)}
         <div className={styles.finished_tasks}>
            {plans.map((item: any, index: number) => (
               <ToDoItemHoriz
                  key={item?.id + "ewf" + index}
                  isCompl={false}
                  data={item}
                  notice={notice}
                  deadline={item.deadline}
               />
            ))}
         </div>
         {isDataAll && (
            isLoading ? <Loading /> : <button className={styles.loadMore} onClick={onLoadMore} disabled={isLoading}>
               Load more
            </button>
         )}
      </div>
   );
};

export default memo(FinishedTasks);
