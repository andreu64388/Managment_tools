
import { FC, useEffect, useState } from "react";
//@ts-ignore
import styles from './Template.module.scss';
//@ts-ignore
import { ReactComponent as Create } from "../../assets/images/create.svg"
import { ModalTask, ModalTemplate, TextTruncate } from "../../componets";
//@ts-ignore
import icon_1 from "../../assets/images/icon_1.svg";
//@ts-ignore
import edit from "../../assets/images/edit.svg";
//@ts-ignore
import delete_img from "../../assets/images/delete.svg"
import { useGetTemplate } from "../../utils/hooks/useGetTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { formatDuration } from "../../utils/format/format";
import { useDeleteTask } from "../../utils/hooks/useDeleteTask";
import usePageSettings from "../../utils/hooks/usePageSettings";
import { useDeleteTemplate } from "../../utils/hooks/useDeleteTemplate";


export const TemplatePage: FC = () => {
   usePageSettings('Template');
   const navigate = useNavigate();
   const { templateId } = useParams();

   const [data, setData] = useState<any>({});
   const [openValue, setOpenValue] = useState<boolean>(false);
   const [openValueEdit, setOpenValueEdit] = useState<boolean>(false);
   const [openValueTemplate, setOpenValueTemplate] = useState<boolean>(false);
   const [name, setName] = useState<string>('')


   const ShowModal = () => {
      setOpenValue(true);
   };

   const ShowModalEdit = () => {
      setOpenValueEdit(true);
   };

   const ShowModalTemplate = () => {
      setOpenValueTemplate(true);
   };



   const { template, isLoading, errorMessage, refetch }: any = useGetTemplate(Number(templateId));
   const { handleDeletTask }: any = useDeleteTask();
   const { handleDeletTemplate } = useDeleteTemplate()


   useEffect(() => {
      setName(template?.template?.name)
   }, [template])

   const tasks = template?.template?.tasks;
   const id = template?.template?.id;

   const updateState = () => {
      refetch();
   };

   const updateStateTemplate = (data: any) => {
      setName(data.name)

   };

   const handleEdit = (dataDto: any) => {
      setData(dataDto);
      ShowModalEdit();
   };

   const handleDelete = async (id: number) => {
      const isSuccess = await handleDeletTask(id);
      if (isSuccess) {
         updateState();
      }
   };

   const handleDeleteTemplate = async (id: number) => {
      const isSuccess = await handleDeletTemplate(id);
      if (isSuccess) {
         navigate(-1);
      }
   }

   if (isLoading) {
      return <div>Loading...</div>;
   }

   if (errorMessage) {
      return <div>{errorMessage}</div>;
   }

   return (
      <div className={styles.template}>
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
               <p className={styles.title}>{name}</p>
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
            <p className={styles.count}>{template?.taskCount} tasks</p>
            <div className={styles.tasks}>
               {tasks?.map((task: any, index: number) => (
                  <TaskItem
                     key={task.id}
                     task={task}
                     index={index}
                     handleEdit={handleEdit}
                     handleDelete={handleDelete}
                  />
               ))}
            </div>
         </div>
         {openValue && (
            <ModalTask openValue={openValue} notice={updateState} id={id} ChangeOpen={(val: boolean) => setOpenValue(val)} />
         )}
         {openValueEdit && (
            <ModalTask
               openValue={openValueEdit}
               data={data}
               id={id}
               notice={updateState}
               ChangeOpen={(val: boolean) => setOpenValueEdit(val)}
            />
         )}
         {openValueTemplate && (
            <ModalTemplate
               openValue={openValueEdit}
               data={name}
               id={id}
               notice={updateStateTemplate}
               ChangeOpen={(val: boolean) => setOpenValueTemplate(val)}
            />
         )}

      </div>
   );
};


interface TaskItemProps {
   task: any;
   index: number;
   handleEdit: (dataDto: any) => void;
   handleDelete: (taskId: number) => void;
}

const TaskItem: FC<TaskItemProps> = ({ task, index, handleEdit, handleDelete }) => (
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
);