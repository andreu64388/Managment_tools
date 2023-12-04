
import { useEffect, useState } from 'react';
import Input from '../Input';
import Modal from '../Modal'
//@ts-ignore
import styles from './ModalTask.module.scss';
import { useCreateTemplate } from '../../utils/hooks/useCreateTemplate';
import { useUpdateTemplate } from '../../utils/hooks/useUpdateTemplate';
import LoadingDown from '../LoadingDown';
import TimeChoice from '../TimeChoice';

enum TimeUnit {
   Minutes = 'minutes',
   Hours = 'hours',
   Days = 'days',
}

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
   const [timeUnit, setTimeUnit] = useState<TimeUnit>(TimeUnit.Minutes);
   const [timeUnitDur, setTimeUnitDur] = useState<TimeUnit>(TimeUnit.Minutes);

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

   const CloseModal = () => {
      ChangeOpen(false)
   }

   const handleUnitChange = (unit: TimeUnit) => {
      setTimeUnit(unit);
   };
   const handleUnitChangeDur = (unit: TimeUnit) => {
      setTimeUnitDur(unit);
   };

   useEffect(() => {
      if (data) {
         setName(data.name)
         setPrepTime(data?.prepTime)
         setIdealPreReq(data?.idealPreReq)
      }
   }, [data])

   const { handleSubmit, isLoading: isLoadDelete } = useCreateTemplate()

   const CreateTemplate = async () => {


      if (name.length > 0) {
         const data = {
            name,
            prepTime: convertToMinutes(prepTime, timeUnit),
            idealPreReq: idealPreReq,
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
         prepTime: convertToMinutes(prepTime, timeUnit),
         idealPreReq: idealPreReq,
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
                     label={<TimeChoice text='Prep Time' value={timeUnit} onChange={handleUnitChange} />}
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
                     onChange={(value) => setIdealPreReq(value)}
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