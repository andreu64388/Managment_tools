import { useEffect, useState } from 'react';
//@ts-ignore
import styles from "./ModalTask.module.scss";
import Modal from '../Modal';
import Input from '../Input';
import Editor from '../Editor';
import { useCreateTask } from '../../utils/hooks/useCreateTask';
import { useUpdateTask } from '../../utils/hooks/useUpdateTask';
import LoadingDown from '../LoadingDown';
import TimeChoice from '../TimeChoice';

enum TimeUnit {
   Minutes = 'minutes',
   Hours = 'hours',
   Days = 'days',
}

const ModalTask = ({ openValue, ChangeOpen, data, notice, id }: {
   openValue: boolean;
   ChangeOpen: (val: boolean) => void;
   data?: any;
   notice?: any;
   id?: any;
}) => {
   const [title, setTitle] = useState<string>("");
   const [editorValue, setEditorValue] = useState<string>('');
   const [duraction, setDuraction] = useState<string>("");
   const [video, setVideo] = useState<any>([])
   const [taskId, setTaskId] = useState<string>("")
   const { handleCreate, isLoading: isLoadCreate, }: any = useCreateTask();
   const { handleUpdate, isLoading: isLoadUpdate, }: any = useUpdateTask();
   const [timeUnit, setTimeUnit] = useState<TimeUnit>(TimeUnit.Minutes);


   useEffect(() => {
      if (data) {
         setEditorValue(data?.descriptions);
         setTitle(data?.title);
         setDuraction(data?.duration);
         setVideo(data?.video)
         setTaskId(data?.id)
      }
   }, [data]);

   const CloseModal = (): void => {
      ChangeOpen(false);
   };

   const handleVideoUrlChange = (url: string) => {
      setVideo(url);
   };

   const convertToMinutes = (value: string, unit: TimeUnit): number => {
      const numericValue = parseFloat(value);
      switch (unit) {
         case TimeUnit.Hours:
            return numericValue * 60;
         case TimeUnit.Days:
            return numericValue * 24 * 60;
         default:
            return numericValue;
      }
   };


   const handleUnitChange = (unit: TimeUnit) => {
      setTimeUnit(unit);
   };

   const handleEditorChange = (content: string) => {
      setEditorValue(content);

      const urlRegex = /<a\b[^>]*>(.*?)<\/a>/g;
      const matches = content?.match(urlRegex);

      if (matches) {
         matches?.forEach(match => {
            const hrefRegex = /href=["'](.*?)["']/;
            const hrefMatch = match?.match(hrefRegex);
            if (hrefMatch) {
               const href = hrefMatch[1];
               setVideo((prevVideo: any) => {
                  const videoArray = Array.isArray(prevVideo) ? prevVideo : [];
                  if (!videoArray.includes(href)) {
                     return [...videoArray, href];
                  }
                  return videoArray;
               });
            }
         });
      }
   };

   const extractUrlsFromDescription = (description: string) => {
      const urlRegex = /<a\b[^>]*>(.*?)<\/a>/g;
      const matches = description?.match(urlRegex);
      const urls: any = [];

      if (matches) {
         matches.forEach(match => {
            const hrefRegex = /href=["'](.*?)["']/;
            const hrefMatch = match?.match(hrefRegex);

            if (hrefMatch) {
               const href = hrefMatch[1];
               urls.push(href);
            }
         });
      }

      return urls;
   };


   const CreateTask = async () => {

      if (!title || !editorValue || !duraction || isLoadCreate) return;


      const dura = convertToMinutes(duraction, timeUnit);

      const data = {
         title,
         descriptions: editorValue,
         duration: dura.toString(),
         templateId: id,
         video: video?.length > 0 ? video : null
      }


      const isSuccess = await handleCreate(data);
      if (isSuccess) {
         notice(isSuccess);
         ChangeOpen(false);
      }
   };

   const UpdateTask = async () => {
      if (!title || !editorValue || !duraction || isLoadUpdate) return;

      if (data) {
         const dura = convertToMinutes(duraction, timeUnit);

         const videos = extractUrlsFromDescription(editorValue)
         alert(JSON.stringify(videos))
         setVideo(videos)
         const datas = {
            taskId: data?.id,
            title,
            descriptions: editorValue,
            duration: dura.toString(),
            templateId: id,
            video: videos?.length > 0 ? videos : null
         }

         const isSuccess = await handleUpdate(datas);

         if (isSuccess) {
            notice(isSuccess);
            ChangeOpen(false);
         }
      }
   };

   return (
      <div className={styles.task}>
         <Modal open={openValue} onClose={CloseModal} maxWidth={"700px"}>
            <div className={styles.main}>
               <h1 className={styles.title}>
                  {data ? "Edit " : "Create "} Task
               </h1>
               <div className={styles.content}>
                  <Input
                     placeholder={"Enter title task"}
                     label={"Title"}
                     value={title}
                     error={false}
                     onChange={(value) => setTitle(value)}
                  />
                  <Input
                     placeholder={"Enter duration task"}
                     label={<TimeChoice
                        text={"Duractioin"}
                        value={timeUnit}
                        onChange={handleUnitChange} />}
                     value={duraction}
                     error={false}
                     type={"number"}
                     onChange={(value) => setDuraction(value)}
                  />
                  <Editor value={editorValue} onChange={handleEditorChange} />
                  <button className={styles.btn} onClick={data ? UpdateTask : CreateTask}>
                     <p className={styles.text}>
                        {data ? "Update " : "Create "} task
                     </p>
                  </button>

               </div>
            </div>
         </Modal>
         {isLoadCreate && <LoadingDown isVisible={isLoadCreate} />}
         {isLoadUpdate && <LoadingDown isVisible={isLoadUpdate} />}
      </div>
   );
};

export default ModalTask;
