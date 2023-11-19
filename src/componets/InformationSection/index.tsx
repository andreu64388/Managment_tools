import { FC, memo } from "react";
//@ts-ignore
import styles from "./information.module.scss"
import { Link } from "react-router-dom";
import { TextTruncate } from "../../componets";
//@ts-ignore
import rectannge from "../../assets/images/Rectangle1.svg"
//@ts-ignore
import rectannge_2 from "../../assets/images/Rectangle2.svg";
//@ts-ignore
import rectannge_3 from "../../assets/images/Rectangle.svg";
//@ts-ignore
import rectannge_4 from "../../assets/images/Rectangle3.svg";
//@ts-ignore
import rock from "../../assets/images/rock_main.svg";



interface InformationSectionProps {
   user: { email?: string };
}

const InformationSection: FC<InformationSectionProps> = ({ user }) => {
   return (
      <div className={styles.information}>
         <img src={rectannge} alt="1" className={styles.rectannge_first} />
         <img src={rectannge_2} alt="2" className={styles.rectannge_second} />
         <img src={rectannge_3} alt="3" className={styles.rectannge_third} />
         <img src={rectannge_4} alt="4" className={styles.rectannge_fourth} />
         <div className={styles.info}>
            <h1>Hi,
               <TextTruncate
                  text={user?.email + "!"}
                  maxCharactersDesktop={30}
                  breakpointTablet={970}
                  maxCharactersTablet={20}
                  maxCharactersMobile={15}
                  maxCharactersMobileMin={15}
                  breakpointMobile={700}
               />

            </h1>
            <p className={styles.decription}>
               You are almost there! <br /> Now it’s time to<Link to="/new-campaign"> create your first great
                  campaign</Link>
            </p>
         </div>
         <div className={styles.img}>
            <img src={rock} alt="img" />
         </div>
      </div>
   );
}

export default memo(InformationSection);