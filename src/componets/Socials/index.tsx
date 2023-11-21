import { FC, memo } from 'react'
//@ts-ignore
import styles from "./Socials.module.scss"
//@ts-ignore
import facebook from "../../assets/images/Facebook.svg"
//@ts-ignore
import google from "../../assets/images/Google.svg"

//@ts-ignore
import apple from "../../assets/images/Apple.svg"
import { URL_SERVER } from '../../redux/api/api.constant'

const Socials: FC = () => {

   const handleGoogleClick = () => {
      window.open(`${URL_SERVER}/google`, "_self");
   }
   return (
      <div className={styles.icons}>
         <div className={styles.icon}>
            <img src={facebook} alt="facebbok" />
         </div>
         <div className={styles.icon} onClick={handleGoogleClick}>
            <img src={google} alt="google" />
         </div>
         <div className={styles.icon}>
            <img src={apple} alt="apple" />
         </div>
      </div>
   )
}


export default memo(Socials);
