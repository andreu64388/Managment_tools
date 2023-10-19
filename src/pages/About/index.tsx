import {FC} from "react";
//@ts-ignore
import clock from "../../assets/images/clock.svg";
//@ts-ignore
import styles from "./About.module.scss";
//@ts-ignore
import done from "../../assets/images/done1.svg";

//@ts-ignore
import rem from "../../assets/images/rem.svg";
import {useNavigate} from "react-router-dom";

export const AboutPage: FC = () => {
    const navigate = useNavigate();

    const Click = () => {
        navigate(-1);
    }
    return (
        <div className={styles.about}>
            <section className={styles.section}>
                <button className={styles.btn_back}>
                    <div className={styles.img}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M20.2498 12.0002C20.2498 12.1991 20.1708 12.3898 20.0302 12.5305C19.8895 12.6711 19.6987 12.7502 19.4998 12.7502H6.30983L11.7798 18.2202C11.8535 18.2888 11.9126 18.3716 11.9536 18.4636C11.9946 18.5556 12.0166 18.6549 12.0184 18.7556C12.0202 18.8563 12.0017 18.9564 11.964 19.0498C11.9262 19.1431 11.8701 19.228 11.7989 19.2992C11.7276 19.3704 11.6428 19.4266 11.5494 19.4643C11.456 19.502 11.356 19.5205 11.2553 19.5187C11.1546 19.517 11.0553 19.4949 10.9633 19.4539C10.8713 19.4129 10.7885 19.3538 10.7198 19.2802L3.96983 12.5302C3.82938 12.3895 3.75049 12.1989 3.75049 12.0002C3.75049 11.8014 3.82938 11.6108 3.96983 11.4702L10.7198 4.72015C10.7885 4.64647 10.8713 4.58736 10.9633 4.54637C11.0553 4.50538 11.1546 4.48334 11.2553 4.48156C11.356 4.47979 11.456 4.49831 11.5494 4.53603C11.6428 4.57375 11.7276 4.6299 11.7989 4.70112C11.8701 4.77233 11.9262 4.85717 11.964 4.95056C12.0017 5.04394 12.0202 5.14397 12.0184 5.24468C12.0166 5.34538 11.9946 5.44469 11.9536 5.53669C11.9126 5.62869 11.8535 5.71149 11.7798 5.78015L6.30983 11.2502H19.4998C19.6987 11.2502 19.8895 11.3292 20.0302 11.4698C20.1708 11.6105 20.2498 11.8012 20.2498 12.0002Z"
                                  fill="#FF385C"/>
                        </svg>
                    </div>
                    <p className={styles.text} onClick={Click}>Back to plan</p>
                </button>
                <div className={styles.info}>
                    <h1 className={styles.title}>
                        Week 1
                    </h1>
                    <p className={styles.text}>
                        Sep 3
                    </p>
                    <div className={styles.buttons}>
                        <button className={styles.complete} >
                            <img src={done} alt="icon_1"/>
                             <p>   Complete</p>
                        </button>
                        <button className={styles.remove}>

                            <img src={rem} alt="icon_1"/>
                            <p>   Remove</p>
                        </button>
                    </div>

                </div>
            </section>
            <main
                className={styles.main}>
                <div className={styles.up}>
                    <h1>
                        Watch overall launch plan video
                    </h1>

                    <div className={styles.times}>
                        <img src={clock} alt="icon_2"/>
                        <p>15 minutes</p>
                    </div>
                </div>
                <div className={styles.down}>
                    <p className={styles.text}>
                        A product launch video introduces a new product to the market. It is a way for brands to generate
                        excitement and buzz around their new product and to explain its usability and benefits to potential
                        customers. Product launch videos can be used on a variety of channels, including websites, social
                        media, YouTube, and email marketing.
                    </p>
                    <p className={styles.text}>
                        A memorable launch video incorporates compelling storytelling techniques, high-quality visuals, an
                        engaging script, and relevant call-to-actions (CTAs)—all to encourage viewers to take the desired
                        action. </p>
                    <p className={styles.text}>
                        Here are a few reasons why you should create product launch videos: </p>
                    <p className={styles.title}>
                        1. Build relationships with customers
                    </p>
                    <p className={styles.text}>
                        Product launch videos allow you to humanize your brand and establish a strong connection with your
                        audience. GoPro does it very well in their product launch videos. They are the pro when it comes to
                        video marketing.
                    </p>
                    <p className={styles.text}>
                        In their latest HERO11 Black, they effectively communicate the thrill and adventure associated with
                        their action cameras, inspiring viewers to become part of the GoPro community and capture their
                        extraordinary moments. </p>
                    <p className={styles.text}>
                        By evoking such emotions through videos, you can create a memorable experience that resonates with
                        your target audience. </p>
                    <p className={styles.title}>
                        2. Increase brand awareness
                    </p>
                    <p className={styles.text}>
                        By incorporating creative storytelling, stunning visuals, and captivating narratives, you can leave a lasting impression on your audience, making them more likely to remember your brand when making purchasing decisions.</p>
                </div>
            </main>

        </div>
    );
};