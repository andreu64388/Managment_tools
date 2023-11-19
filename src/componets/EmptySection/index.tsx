//@ts-ignore
import { Link } from "react-router-dom";
//@ts-ignore
import styles from "./EmptySection.module.scss"
import { memo } from 'react';

const EmptySection: React.FC = () => {
   return (
      <div className={styles.empty}>
         <p className={styles.decription}>
            There are no active campaigns now. Start with <Link to="/new-campaign"> creating a new campaign.</Link>
         </p>
      </div>
   );
}

export default memo(EmptySection);