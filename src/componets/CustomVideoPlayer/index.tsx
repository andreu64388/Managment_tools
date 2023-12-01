import { useRef, useState, useEffect, FC } from 'react';
//@ts-ignore
import styles from './CustomVideoPlayer.module.scss';

interface CustomVideoPlayerProps {
   videoSrc: string;
}

const CustomVideoPlayer: FC<CustomVideoPlayerProps> = ({ videoSrc }) => {
   const videoRef = useRef<HTMLVideoElement>(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const [progress, setProgress] = useState(0);
   const [duration, setDuration] = useState(0);
   const [currentTime, setCurrentTime] = useState(0);

   useEffect(() => {
      const videoElement = videoRef.current;

      if (videoElement) {
         setDuration(videoElement.duration);

         videoElement.addEventListener('timeupdate', () => {
            setCurrentTime(videoElement.currentTime);
            setProgress((videoElement.currentTime / videoElement.duration) * 100);
         });

         videoElement.addEventListener('ended', () => {
            setIsPlaying(false);
         });
      }

      return () => {
         if (videoElement) {
            videoElement.removeEventListener('timeupdate', () => { });
            videoElement.removeEventListener('ended', () => { });
         }
      };
   }, []);

   const togglePlay = () => {
      const videoElement = videoRef.current;

      if (videoElement) {
         if (isPlaying) {
            videoElement.pause();
         } else {
            videoElement.play();
         }

         setIsPlaying(!isPlaying);
      }
   };

   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const videoElement = videoRef.current;

      if (videoElement) {
         const newProgress = Number(e.target.value);
         const newTime = (newProgress / 100) * videoElement.duration;
         videoElement.currentTime = newTime;
      }
   };

   return (
      <div className={styles.videoPlayer}>
         <video ref={videoRef} src={videoSrc} className={styles.video}></video>
         <div className={styles.controls}>
            <button onClick={togglePlay}>
               {isPlaying ? 'Pause' : 'Play'}
            </button>
            <div className={styles.progressBar}>
               <input
                  type="range"
                  value={progress}
                  onChange={handleSeek}
                  step="0.01"
               />
            </div>
            <div className={styles.duration}>
               {formatTime(currentTime)} / {formatTime(duration)}
            </div>
         </div>
      </div>
   );
};

const formatTime = (seconds: number): string => {
   const minutes = Math.floor(seconds / 60);
   const remainingSeconds = Math.floor(seconds % 60);
   const formattedMinutes = String(minutes).padStart(2, '0');
   const formattedSeconds = String(remainingSeconds).padStart(2, '0');
   return `${formattedMinutes}:${formattedSeconds}`;
};

export default CustomVideoPlayer;
