import React, { ReactNode, useState, useEffect, useRef, FC } from 'react';
//@ts-ignore
import styles from './Modal.module.scss';

//@ts-ignore
import close from "../../assets/images/close.svg"

type ModalProps = {
   open?: boolean;
   onClose: () => void;
   children?: ReactNode;
   maxWidth?: string
};

export const Modal: FC<ModalProps> = ({ onClose, children, maxWidth }) => {
   const [isClosing, setIsClosing] = useState(true);
   const modalRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
         if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            handleClose();
         }
      };

      const handleEscPress = (event: KeyboardEvent) => {
         if (event.key === 'Escape') {
            handleClose();
         }
      };

      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscPress);

      return () => {
         document.removeEventListener('mousedown', handleOutsideClick);
         document.removeEventListener('keydown', handleEscPress);
      };
   }, []);

   const handleClose = () => {
      setIsClosing(false);
      setTimeout(() => {
         onClose();
      }, 300);
   };

   return (
      <div className={`${styles.modal} ${!isClosing ? styles.hidden : ''}`}>
         <div className={styles['modal-container']}>
            <div
               className={styles['modal-content']}
               style={{ maxWidth: maxWidth ? maxWidth : '400px' }}
               ref={modalRef}
            >
               <button className={styles['close-button']} onClick={handleClose}>
                  <img src={close} alt="close" />
               </button>
               {children}
            </div>
         </div>
      </div>
   );
};
