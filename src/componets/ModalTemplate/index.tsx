
import { useEffect, useState } from 'react';
import Input from '../Input';
import Modal from '../Modal'
//@ts-ignore
import styles from './ModalTask.module.scss';
import { useCreateTemplate } from '../../utils/hooks/useCreateTemplate';
import { useUpdateTemplate } from '../../utils/hooks/useUpdateTemplate';
import LoadingDown from '../LoadingDown';

const ModalTemplate = ({ openValue, ChangeOpen, notice, data, id }: {
   openValue: boolean,
   ChangeOpen: (val: boolean) => void
   notice: any,
   data?: any
   id?: number
}) => {

   const [name, setName] = useState<string>("");
   const [prepTime, setPrepTime] = useState<string>("");
   const [idealPreReq, setIdealPreReq] = useState<string>("");
   const [duration, setDuration] = useState<string>("");

   const CloseModal = () => {
      ChangeOpen(false)
   }

   useEffect(() => {
      if (data) {
         setName(data.name)
         setPrepTime(data?.prepTime)
         setIdealPreReq(data?.idealPreReq)
         setDuration(data?.duration)
      }
   }, [data])

   const { handleSubmit, isLoading: isLoadDelete } = useCreateTemplate()

   const CreateTemplate = async () => {

      if (name.length > 0) {
         const data = {
            name,
            prepTime: Number(prepTime),
            idealPreReq: Number(idealPreReq),
            duration: Number(duration),

         }
         const isSuccess = await handleSubmit(data);

         if (isSuccess) {
            notice(isSuccess)
            CloseModal()
         }
      }
   }

   const { handleUpdate, isLoading: isLoadingUpdate } = useUpdateTemplate()
   const UpdateTemplate = async () => {


      const data = {
         name,
         templateId: id,
         prepTime: Number(prepTime),
         idealPreReq: Number(idealPreReq),
         duration: Number(duration),
      }

      const isSuccess = await handleUpdate(data);
      if (isSuccess) {
         notice(isSuccess)
         CloseModal()
      }
   }
   return (
      <div className={styles.template}>
         <Modal maxWidth={"700px"} open={openValue} onClose={CloseModal} >
            <h1 className={styles.title}>
               {
                  data ? "Edit" : "Create"
               } template</h1>
            <div className={styles.content}>
               <div className={styles.left}>
                  <Input
                     placeholder={"Enter name template"}
                     label={"Name"}
                     value={name}
                     error={false}
                     onChange={(value) => setName(value)}
                  />
                  <Input
                     placeholder={"Enter prep Time template "}
                     label={"Prep Time"}
                     value={prepTime}
                     error={false}
                     type={"number"}
                     onChange={(value) => setPrepTime(value)}
                  />
               </div>
               <div className={styles.right}>
                  <Input
                     placeholder={"Enter ideal Pre Req template"}
                     label={"Ideal Pre Req"}
                     value={idealPreReq}
                     error={false}
                     type={"number"}
                     onChange={(value) => setIdealPreReq(value)}
                  />
                  <Input
                     placeholder={"Enter duration template"}
                     label={"Duration"}
                     value={duration}
                     error={false}
                     type={"number"}
                     onChange={(value) => setDuration(value)}
                  />
               </div>

            </div>
            <button className={styles.btn}
               onClick={
                  data ? UpdateTemplate : CreateTemplate
               }>
               <p
                  className={styles.text}
               >{
                     data ? "Update" : "Create"
                  } template</p>
            </button>
         </Modal>
         {isLoadDelete && <LoadingDown isVisible={isLoadDelete} />}
         {isLoadingUpdate && <LoadingDown isVisible={isLoadingUpdate} />}
      </div >
   )
}


export default ModalTemplate