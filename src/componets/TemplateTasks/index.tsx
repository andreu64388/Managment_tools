


import { FC, memo, useEffect, useRef, useState } from 'react'
//@ts-ignore
import icon_1 from "../../assets/images/icon_1.svg";
//@ts-ignore
import styles from './TemplateTasks.module.scss'
import { formatDuration } from '../../utils/format/format'
import TextTruncate from '../TextTruncate'
//@ts-ignore
import edit from "../../assets/images/edit.svg";
//@ts-ignore
import delete_img from "../../assets/images/delete.svg"
import { useGetTasks } from '../../utils/hooks/useGetTasks';
import { useDeleteTask } from '../../utils/hooks/useDeleteTask';
import ModalTask from '../ModalTask';
import Loading from '../Loading';

const TemplateTasks = ({ id, taskData, Notice }: any) => {

   const [openValueEdit, setOpenValueEdit] = useState<boolean>(false);
   const [offsetLoad, setOffsetLoad] = useState<number>(0);
   const [data, setData] = useState<any>({});

   const { tasks, errorMessage, isDataAll, isLoading, AddTask, UpdateTask, DeleteTask, loadingMore, LoadMore }: any = useGetTasks({
      offset: offsetLoad,
      limit: 5,
      id: Number(id)
   })


   const loadMoreData = () => {
      if (!loadingMore) {
         setOffsetLoad((prevCount: number) => prevCount + 5);
         LoadMore();
      }
   };
   useEffect(() => {
      if (taskData && Object.keys(taskData).length !== 0) {
         AddTask(taskData)
      }
   }, [taskData]);

   const loadMoreTriggerRef = useRef<HTMLDivElement>(null);


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

   const { handleDeletTask }: any = useDeleteTask();

   const Update = (data: any) => {

      UpdateTask(data)
   }

   const handleDelete = async (id: number) => {
      const isSuccess = await handleDeletTask(id);
      if (isSuccess) {
         DeleteTask(isSuccess)
         Notice(id)
      }

   };

   const handleEdit = (dataDto: any) => {
      setData(dataDto);
      setOpenValueEdit(true);
   };


   if (errorMessage)
      return <div>Error: {errorMessage}</div>



   if (isLoading) {
      return null
   }
   return (
      <div className={styles.template}>
         {openValueEdit && (
            <ModalTask
               openValue={openValueEdit}
               data={data}
               id={id}
               notice={Update}
               ChangeOpen={(val: boolean) => setOpenValueEdit(val)}
            />
         )}

         <div className={styles.tasks}>
            {Array.isArray(tasks) && tasks.map((task: any, index: number) => (
               <TaskItem
                  key={task.id}
                  task={task}
                  index={index}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
               />
            ))}
            {isDataAll && (
               <div className={styles.loadMore} ref={loadMoreTriggerRef}>
                  {loadingMore ? <Loading /> : null}
               </div>
            )}
         </div>

      </div>
   )
}

export default TemplateTasks

interface TaskItemProps {
   task: any;
   index: number;
   handleEdit: (dataDto: any) => void;
   handleDelete: (taskId: number) => void;
}

const TaskItem: FC<TaskItemProps> = memo(({ task, index, handleEdit, handleDelete }) => (
   <div className={styles.next_task} key={task.id}>
      <div className={styles.down_text}>
         <div className={styles.text}>
            <div className={styles.main}>
               <div className={styles.number}>{index + 1}</div>
               <div className={styles.img}>
                  <img src={icon_1} alt="done" />
               </div>
               <div className={styles.description}>
                  <div className={styles.title}>
                     <TextTruncate
                        text={task?.title}
                        maxCharactersDesktop={50}
                        breakpointTablet={1073}
                        maxCharactersTablet={40}
                        maxCharactersMobile={20}
                        maxCharactersMobileMin={20}
                        breakpointMobile={989}
                     /></div>
                  <div className={styles.times}>
                     {formatDuration(task?.duration)}
                  </div>
               </div>
            </div>
            <div className={styles.buttons}>
               <button className={styles.edit} onClick={() => handleEdit(task)}>
                  <img src={edit} alt="edit" className={styles.btn_img} />
                  <p className={styles.btn_text}>Edit</p>
               </button>
               <button onClick={() => handleDelete(task.id)} className={styles.delete}>
                  <img className={styles.delete_img} src={delete_img} alt="delete" />
               </button>
            </div>
         </div>
      </div>
   </div>
))