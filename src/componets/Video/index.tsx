import React, { useEffect, useRef } from 'react';
import axios from '../../api';
import { URL_SERVER } from '../../redux/api/api.constant';
//@ts-ignore
import styles from "./Video.module.scss"
import { getAuthToken } from '../../utils/localStorage';

const VideoComponent = ({ videoName }: { videoName: string }) => {
   const videoRef = useRef<HTMLVideoElement>(null);

   useEffect(() => {
      const getVideo = async () => {
         try {
            if (!videoName) return
            const response = await axios.get(`/videos/${videoName}`, {
               responseType: 'arraybuffer',
               headers: {
                  'Range': 'bytes=0-',
               },
            });

            if (!response.data) {

               return;
            }

            if (videoRef.current) {
               videoRef.current.src = ` ${URL_SERVER}/videos/${videoName}`;

               videoRef.current.load();
            }
         } catch (error) {


         }
      };

      getVideo();

      return () => {
         if (videoRef.current) {
            videoRef.current.src = '';
            videoRef.current.load();
         }
      };
   }, [videoName]);

   return (
      <div>
         <video ref={videoRef} controls
            className={styles.video}
         >
            Your browser does not support the video tag.
         </video>
      </div>
   );
};

export default VideoComponent;
