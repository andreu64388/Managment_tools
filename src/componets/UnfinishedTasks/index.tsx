import React, { FC, memo, useState } from 'react';
import InformationSection from "../InformationSection";
import EmptySection from "../EmptySection";
import { Link } from "react-router-dom";
//@ts-ignore
import { ReactComponent as Create } from '../../assets/images/create.svg';
//@ts-ignore
import styles from './UnfinishedTasks.module.scss';
import ToDoItemHoriz from "../ToDoItemHoriz";
import Loading from "../Loading";
import { useGetUncompleted } from '../../utils/hooks/useGetUncompleted';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/auth.slice';
import LoadingDown from '../LoadingDown';

const UnfinishedTasks: FC = () => {


   const user = useSelector(selectUser);

   const [offsetLoad, setOffsetLoad] = useState<number>(0);
   const { plans, isDataAll, isLoading, Delete, loadingMore, LoadMore }: any = useGetUncompleted({
      offset: offsetLoad,
      limit: 5,
   });


   const onLoadMoreUn = () => {
      if (!loadingMore) {
         setOffsetLoad((prevCount: number) => prevCount + 5);
         LoadMore()
      }
   }

   const onNotice = (id: number) => {

      alert(id)
      Delete(id);
   }

   if (isLoading) {
      return <Loading />
   }


   return (
      <div className={styles.unfinishedTasks}>
         {plans?.length > 0 ? (
            <>
               <InformationSection user={user} />
               <div className={styles.up}>
                  <h1 className={styles.title}>Campaigns</h1>
                  <Link to="/new-campaign" className={styles.btn}>
                     <Create fill={'white'} width={'20'} className={styles.svg} height={'20'} />
                     <p className={styles.text}>New campaign</p>
                  </Link>
               </div>
            </>
         ) : (
            <EmptySection />
         )}
         <div className={styles.down}>
            {plans.length > 0 && (
               <div className={styles.tasks}>
                  {plans.map((item: any, index: number) => (
                     <ToDoItemHoriz key={item?.id + "21" + index}
                        isCompl={true}
                        data={item}
                        notice={onNotice} />
                  ))}
                  {isDataAll && (
                     isLoading ? <Loading /> :
                        <button className={styles.loadMore}
                           onClick={onLoadMoreUn}
                           disabled={isLoading}>
                           Load more
                        </button>
                  )}
               </div>
            )}
         </div>
         {loadingMore && <LoadingDown isVisible={loadingMore} />}
      </div>
   );
};

export default memo(UnfinishedTasks);
