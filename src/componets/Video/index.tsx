import React, { useState } from 'react';
//@ts-ignore
import styles from "./Video.module.scss"

interface VideoComponentProps {
   videoUrl?: string | undefined;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ videoUrl }) => {
   const [hasError, setHasError] = useState<boolean>(false);

   const handleError = () => {
      setHasError(true);

   };

   const isValidUrl = /^(http:\/\/|https:\/\/)/.test(videoUrl || '');

   return (
      <div className={styles.videoContainer}>
         {
            videoUrl && isValidUrl && !hasError ? (
               <iframe
                  loading="lazy"
                  className={styles.video}
                  width="560"
                  height="315"
                  src={videoUrl}
                  title='Video'
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onError={handleError}
               ></iframe>
            ) : (
               <p className={styles.error}>
                  {isValidUrl && 'Video is not available'}</p>
            )
         }
      </div>
   );
};

export default VideoComponent;
