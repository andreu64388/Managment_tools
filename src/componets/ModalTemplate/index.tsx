
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


   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      // Меняем состояние для демонстрации анимации
      const timer = setTimeout(() => {
         setIsLoading(!isLoading);
      }, 3000);

      return () => clearTimeout(timer);
   }, [isLoading]);
   const [name, setName] = useState<string>("");
   const CloseModal = () => {
      ChangeOpen(false)
   }

   useEffect(() => {
      if (data) {
         setName(data)
      }
   }, [data])

   const { handleSubmit, isLoading: isLoadDelete } = useCreateTemplate()

   const CreateTemplate = async () => {

      if (name.length > 0) {
         const data = {
            name
         }
         const isSuccess = await handleSubmit(data);

         if (isSuccess) {
            notice(isSuccess)
            CloseModal()
         }
      }
   }

   const { handleUpdate, isLoading:isLoadingUpdate } = useUpdateTemplate()
   const UpdateTemplate = async () => {

      const data = {
         name,
         templateId: Number(id)
      }
      const isSuccess = await handleUpdate(data);
      if (isSuccess) {
         notice(isSuccess)
         CloseModal()
      }
   }
   return (
      <div className={styles.template}>
         <Modal open={openValue} onClose={CloseModal} >
            <h1
               className={styles.title}
            >
               {
                  data ? "Edit" : "Create"
               } template</h1>
            <div className={styles.content}>
               <Input
                  placeholder={"Enter name template"}
                  label={"Name"}
                  value={name}
                  error={false}
                  onChange={(value) => setName(value)}
               />
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
            </div>
         </Modal>
         {isLoadDelete && <LoadingDown isVisible={isLoadDelete} />}
         {isLoadingUpdate && <LoadingDown isVisible={isLoadingUpdate} />}
      </div>
   )
}


export default ModalTemplate