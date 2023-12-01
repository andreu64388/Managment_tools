import { ChangeEvent, useEffect, useState } from 'react';
//@ts-ignore
import styles from "./ModalTask.module.scss";
import Modal from '../Modal';
import Input from '../Input';
import Editor from '../Editor';
import { useCreateTask } from '../../utils/hooks/useCreateTask';
import { useUpdateTask } from '../../utils/hooks/useUpdateTask';
import LoadingDown from '../LoadingDown';
import VideoUpload from '../VideoUpload';
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
   const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
   const [video, setVideo] = useState<string>("")
   const [taskId, setTaskId] = useState<string>("")
   const { handleCreate, isLoading: isLoadCreate, videoUploadProgress }: any = useCreateTask();
   const { handleUpdate, isLoading: isLoadUpdate, videoUploadProgress: progress }: any = useUpdateTask();
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
   };

   const DeleteVideo = (data: any) => {
      notice(data)

   }
   const handleVideoUpload = (file: File) => {
      setUploadedVideo(file);
   };
   const CreateTask = async () => {

      if (!title || !editorValue || !duraction || isLoadCreate) return;




      const dura = convertToMinutes(duraction, timeUnit);
      const dataDto = new FormData();
      dataDto.append("title", title);
      dataDto.append("descriptions", editorValue);
      dataDto.append("duration", dura.toString());
      dataDto.append("templateId", id);
      uploadedVideo && dataDto.append("video", uploadedVideo);

      const isSuccess = await handleCreate(dataDto);
      if (isSuccess) {
         notice(isSuccess);
         ChangeOpen(false);
      }
   };

   const UpdateTask = async () => {
      if (!title || !editorValue || !duraction || isLoadUpdate) return;

      if (data) {
         const dataDto = new FormData();

         const dura = convertToMinutes(duraction, timeUnit);
         dataDto.append("taskId", data?.id);
         dataDto.append("title", title);
         dataDto.append("descriptions", editorValue);
         dataDto.append("duration", dura.toString());
         dataDto.append("templateId", id);
         uploadedVideo && dataDto.append("video", uploadedVideo);

         const isSuccess = await handleUpdate(dataDto);

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
                  <VideoUpload
                     id={taskId}
                     notice={DeleteVideo}
                     video={data?.video}
                     onVideoUpload={handleVideoUpload} />

                  {videoUploadProgress > 0 && (
                     <div className={styles.progress}>
                        <p>Video Upload Progress: {videoUploadProgress}%</p>
                     </div>
                  )}
                  {progress > 0 && (
                     <div className={styles.progress}>
                        <p>Video Upload Progress: {progress}%</p>
                     </div>
                  )}
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
