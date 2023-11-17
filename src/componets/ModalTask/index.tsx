
import { useEffect, useState } from 'react'
import { Modal } from '../Modal'
//@ts-ignore 
import styles from "./ModalTask.module.scss"
import { Input } from '../Input'
import { Editor } from '../Editor'
import { useCreateTask } from '../../utils/hooks/useCreateTask'
import { useUpdateTask } from '../../utils/hooks/useUpdateTask'



export const ModalTask = ({ openValue, ChangeOpen, data, notice, id }: {
   openValue: boolean,
   ChangeOpen: (val: boolean) => void
   data?: any,
   notice?: any
   id?: any
}) => {

   const [title, setTitle] = useState<string>("");
   const [editorValue, setEditorValue] = useState<string>('');
   const [duraction, setDuraction] = useState<string>("");

   const { handleCreate }: any = useCreateTask()

   const { handleUpdate }: any = useUpdateTask()


   useEffect(() => {
      if (data) {
         setEditorValue(data?.descriptions)
         setTitle(data?.title)
         setDuraction(data?.duration
         )
      }
   }, [data])




   const handleEditorChange = (content: string) => {
      setEditorValue(content);
   };


   const CloseModal = (): void => {
      ChangeOpen(false)
   }


   const CreateTask = async () => {
      if (!title || !editorValue || !duraction) return
      const obj = {
         title,
         descriptions: editorValue,
         duration: Number(duraction),
         templateId: id
      }
      const isSuccess = await handleCreate(obj);
      if (isSuccess) {
         notice()
         ChangeOpen(false)
      }

   }

   const UpdateTask = async () => {
      if (!title || !editorValue || !duraction) return

      if (data) {
         const obj = {
            taskId: data?.id,
            title,
            descriptions: editorValue,
            duration: duraction,
            templateId: id
         }
         const isSuccess = await handleUpdate(obj);
         if (isSuccess) {
            notice()
            ChangeOpen(false)
         }
      }
   }

   return (
      <div className={styles.task}>
         <Modal open={openValue} onClose={CloseModal}
            maxWidth={"700px"} >
            <div className={styles.main}>
               <h1
                  className={styles.title}
               >{
                     data ? "Edit " : "Create "
                  } Task</h1>
               <div className={styles.content}>
                  <Input
                     placeholder={"Enter title task"}
                     label={"Title"}
                     value={title}
                     error={false}
                     onChange={(value) => setTitle(value)}
                  />
                  <Input
                     placeholder={"Enter duraction task"}
                     label={"Duraction (min)  "}
                     value={duraction}
                     error={false}
                     type={"number"}
                     onChange={(value) => setDuraction(value)}
                  />
                  <Editor value={editorValue} onChange={handleEditorChange} />
                  <button className={styles.btn}
                     onClick={
                        data ? UpdateTask :
                           CreateTask}>
                     <p
                        className={styles.text}
                     >
                        {
                           data ? "Update " : "Create "
                        } task
                     </p>
                  </button>
               </div>
            </div>
         </Modal>
      </div>
   )
}
