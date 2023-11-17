import { FC, useEffect, useState } from 'react'
//@ts-ignore
import styles from "./Admin.module.scss";
import usePageSettings from '../../utils/hooks/usePageSettings';
import { Link } from 'react-router-dom';
//@ts-ignore
import { ReactComponent as Create } from "../../assets/images/create.svg"
import { Loading, ModalTemplate, ToDoItem } from '../../componets';
import { useTemplates } from '../../utils/hooks/useTemplates';


export const AdminPage: FC = () => {

   usePageSettings('Templates');


   const [openValue, setOpenValue] = useState<boolean>(false);

   const [offsetLoad, setoffsetLoad] = useState<number>(0);

   const { templates, isLoading, errorMessage, isDataAll, refetch } = useTemplates({
      offset: offsetLoad,
      limit: 9,
   });





   const ShowModal = () => {
      setOpenValue(true)
   }

   const LoadMore = () => {
      setoffsetLoad((prevCount) => prevCount + 9);
   };


   const notice = () => {
      refetch()

   }


   if (isLoading) {
      return <Loading />
   }
   if (errorMessage) {
      return <div>{errorMessage}</div>
   }


   return (
      <div className={styles.admin}>
         <div className={styles.up}>
            <h1 className={styles.title}>Templates</h1>
            <button
               onClick={ShowModal}
               className={styles.btn}>
               <Create
                  fill={"white"}
                  width={"20"}
                  className={styles.svg}
                  height={"20"}
               />
               <p
                  className={styles.text}
               >Create template</p>
            </button>
         </div>
         <div className={styles.down}>
            <div className={styles.blocks}>
               {
                  templates?.map((item: any) => {
                     return (
                        <Link to={`/admin/template/${item?.id}`} key={item?.id}>
                           <ToDoItem data={item} />
                        </Link>
                     )
                  })
               }
            </div>
            {
               isDataAll && (
                  <button
                     className={styles.loadMore}
                     onClick={LoadMore}
                     disabled={isLoading}>
                     {isLoading ? 'Loading...' : 'Load more'}
                  </button>)
            }
         </div>
         {
            openValue && <ModalTemplate
               notice={notice}
               openValue={openValue}
               ChangeOpen={(val: boolean) => setOpenValue(val)} />
         }
      </div >
   )
}
