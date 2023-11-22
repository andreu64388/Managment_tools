


import { memo, useEffect, useState } from 'react'
//@ts-ignore
import { ReactComponent as Create } from "../../assets/images/create.svg"
//@ts-ignore
import edit from "../../assets/images/edit.svg";
//@ts-ignore
import delete_img from "../../assets/images/DeleteTask.svg";
//@ts-ignore 
import styles from './TemplateText.module.scss'
import ModalTask from '../ModalTask';
import { useDeleteTemplate } from '../../utils/hooks/useDeleteTemplate';
import { useGetTemplate } from '../../utils/hooks/useGetTemplate';
import { useNavigate } from 'react-router-dom';
import ModalTemplate from '../ModalTemplate';
import Loading from '../Loading';


const TemplateText = ({ id, createTask, isDelete }: { id: any, createTask?: any, isDelete: any }) => {

   const [openValue, setOpenValue] = useState<boolean>(false);
   const [openValueTemplate, setOpenValueTemplate] = useState<boolean>(false);

   const { templateValue, setTemplateValue, isLoading, errorMessage }: any = useGetTemplate(id)

   const { handleDeletTemplate } = useDeleteTemplate()

   const navigate = useNavigate();

   const updateStateTemplate = (data: any) => {

      setTemplateValue((prev: any) => ({
         ...prev,
         name: data?.name,
         prepTime: data?.prepTime,
         idealPreReq: data?.idealPreReq,
         duration: data?.duration,
      }));

   };

   const ShowModal = () => {
      setOpenValue(true);
   };

   const updateState = (obj: any) => {
      createTask(obj)

      setTemplateValue((prev: any) => ({
         ...prev,
         taskCount: prev.taskCount + 1,
      }));
   };

   const ShowModalTemplate = () => {
      setOpenValueTemplate(true);
   };


   const handleDeleteTemplate = async (id: number) => {
      const isSuccess = await handleDeletTemplate(id);
      if (isSuccess) {
         navigate(-1);
      }
   }

   useEffect(() => {
      if (isDelete) {
         setTemplateValue((prev: any) => ({
            ...prev,
            taskCount: prev.taskCount - 1,
         }));
      }
   }, [isDelete])


   if (isLoading) return <Loading />

   if (errorMessage) return <div>{errorMessage}</div>

   return (
      <div className={styles.templates}>
         <div className={styles.up}>
            <h1 className={styles.title}>Template</h1>
            <div>
               <div className={styles.buttons_all}>
                  <button className={styles.btn} onClick={ShowModal}>
                     <Create fill="white" width="20" className={styles.svg} height="20" />
                     <p className={styles.text}>Add task</p>
                  </button>
               </div>
            </div>
         </div>
         <div className={styles.down}>
            <div className={styles.name_buttons}>
               <p className={styles.title}>{templateValue?.name}</p>
               <div className={styles.buttons}>
                  <button className={styles.edit} onClick={ShowModalTemplate}>
                     <img src={edit} alt="edit" className={styles.btn_img} />
                  </button>
                  <button className={styles.delete}>
                     <img className={styles.delete_img}
                        onClick={() => handleDeleteTemplate(id)}
                        src={delete_img} alt="delete" />
                  </button>
               </div>
            </div>
            <p className={styles.title}>Duraction: {templateValue?.duration}</p>
            <p className={styles.title}>Prep time: {templateValue?.prepTime}</p>
            <p className={styles.title}>Pre-requisites: {templateValue?.idealPreReq}</p>
            <p className={styles.count}>{templateValue?.taskCount} tasks</p>
         </div>
         {openValue && (
            <ModalTask openValue={openValue}
               notice={updateState}
               id={templateValue?.id}
               ChangeOpen={(val: boolean) => setOpenValue(val)} />
         )}
         {openValueTemplate && (
            <ModalTemplate
               openValue={openValueTemplate}
               data={templateValue}
               id={templateValue?.id}
               notice={updateStateTemplate}
               ChangeOpen={(val: boolean) => setOpenValueTemplate(val)}
            />
         )}
      </div >
   )
}

export default memo(TemplateText)