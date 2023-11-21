
import { FC, memo, useState } from "react";
//@ts-ignore
import styles from './Template.module.scss';
import { TemplateTasks, TemplateText } from "../../componets";
import { useParams } from "react-router-dom";
import usePageSettings from "../../utils/hooks/usePageSettings";


export const TemplatePage: FC = () => {
   usePageSettings('Template');

   const { templateId } = useParams();
   const [taskData, setTaskData] = useState<any>({});
   const [isDelete, setIsDelete] = useState<any>(null);

   const createTask = (obj: any) => {
      setTaskData(obj);
   }

   const Notice = (id: any) => {
      setIsDelete(id)
   }

   return (
      <div className={styles.template}>
         <TemplateText
            id={templateId}
            isDelete={isDelete}
            createTask={createTask} />
         <TemplateTasks
            id={templateId}
            Notice={Notice}
            taskData={taskData}
         />
      </div>
   );
};

export default memo(TemplatePage)
