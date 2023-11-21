import { FC, useEffect, useState, useRef } from 'react';
//@ts-ignore
import styles from "./Admin.module.scss";
import usePageSettings from '../../utils/hooks/usePageSettings';
import { Link } from 'react-router-dom';
//@ts-ignore
import { ReactComponent as Create } from "../../assets/images/create.svg";
import { Loading, ModalTemplate, ToDoItem } from '../../componets';
import { useTemplates } from '../../utils/hooks/useTemplates';

const AdminPage: FC = () => {
   usePageSettings('Templates');

   const [openValue, setOpenValue] = useState<boolean>(false);
   const [offsetLoad, setOffsetLoad] = useState<number>(0);
   const { templates, isLoading, errorMessage, isDataAll, CreateTemplate, loadingMore, LoadMore, refetch } = useTemplates({
      offset: offsetLoad,
      limit: 9,
   });

   const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      refetch();
   }, []);

   const showModal = () => {
      setOpenValue(true);
   };

   const loadMoreData = () => {
      if (!loadingMore) {
         setOffsetLoad((prevCount: number) => prevCount + 9);
         LoadMore();
      }
   };

   const handleScroll = () => {
      if (loadMoreTriggerRef.current) {
         const { top, height } = loadMoreTriggerRef.current.getBoundingClientRect();
         if (top + height <= window.innerHeight) {
            loadMoreData();
         }
      }
   };

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, [handleScroll]);

   const notice = (data: any) => {
      CreateTemplate(data);
   };

   if (isLoading) {
      return <Loading />;
   }
   if (errorMessage) {
      return <div>{errorMessage}</div>;
   }

   return (
      <div className={styles.admin}>
         <div className={styles.up}>
            <h1 className={styles.title}>Templates</h1>
            <button onClick={showModal} className={styles.btn}>
               <Create fill={"white"} width={"20"} className={styles.svg} height={"20"} />
               <p className={styles.text}>Create template</p>
            </button>
         </div>
         <div className={styles.down}>
            <div className={styles.blocks}>
               {templates?.map((item: any) => (
                  <Link to={`/admin/template/${item?.id}`} key={item?.id}>
                     <ToDoItem data={item} />
                  </Link>
               ))}
            </div>

            {isDataAll && (
               <div className={styles.loadMore} ref={loadMoreTriggerRef}>
                  {loadingMore ? <Loading /> : null}
               </div>
            )}

         </div>
         {openValue && <ModalTemplate notice={notice}
            openValue={openValue}
            ChangeOpen={(val: boolean) => setOpenValue(val)} />}
      </div>
   );
};

export default AdminPage;
