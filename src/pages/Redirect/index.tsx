import { FC, useEffect } from 'react'
//@ts-ignore
import styles from "./Redirect.module.scss"
import { useParams } from 'react-router-dom';
import { setAuthToken } from '../../utils/localStorage';
import { useRedirect } from '../../utils/hooks/useRedirect';

export const Redirect: FC = () => {
   const { token } = useParams();
   useEffect(() => {
      if (token)
         setAuthToken(token);
   }, [token]);


   const { isLoading, errorMessage } = useRedirect(token);

   return (
      <div className={styles.redirect}>

         {isLoading &&
            <div className={styles.redirect__title}> Redirecting...
            </div>}
         {errorMessage && <div className={styles.redirect__title}> {errorMessage}
         </div>}

      </div >
   )
}

