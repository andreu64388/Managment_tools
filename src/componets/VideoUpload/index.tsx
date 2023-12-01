import React, { useState, ChangeEvent, useEffect } from 'react';
//@ts-ignore
import styles from './VideoUpload.module.scss';
import VideoComponent from '../Video';
import axios from '../../api';

interface VideoUploadProps {
   onVideoUpload: (file: File) => void;
   video?: string;
   notice?: any
   id?: any

}

const VideoUpload: React.FC<VideoUploadProps> = ({ onVideoUpload, video, notice, id }) => {
   const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
   const [videos, setVideo] = useState<string>("")
   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
   const [isVideoSelected, setIsVideoSelected] = useState<boolean>(false);


   useEffect(() => {
      if (video) {
         setVideo(video)
      }
   }, [video])

   const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files![0];
      setSelectedVideo(file);
      onVideoUpload(file);

      const files = event.target.files;

      if (files && files.length > 0) {
         const selectedFile = files![0];
         setSelectedVideo(selectedFile);

         const videoUrl = URL.createObjectURL(selectedFile);
         setPreviewUrl(videoUrl);
         setIsVideoSelected(true);
      }
   };


   const handleDeleteAsync = async () => {

      if (!videos) return

      try {
         const { data } = await axios.delete(`/tasks/videos/${videos}/${id}`)
         notice(data)
         setSelectedVideo(null);
         setPreviewUrl(null);
         setVideo("");
      }
      catch (err) {

      }

   }

   const handleDelete = () => {
      setSelectedVideo(null);
      setPreviewUrl(null);
   }

   return (
      <div className={styles.videoUpload}>
         <h2>Video Upload</h2>

         {(previewUrl && !videos) && (
            <div className={styles.videoPreview}>
               <video width="320" height="240" controls>
                  <source src={previewUrl} type="video/mp4" />
                  Your browser does not support the video tag.
               </video>
            </div>
         )}
         {videos && <VideoComponent videoName={videos} />}
         {(selectedVideo || videos) ? (
            <div className={styles.selectedVideo}>
               <p>Selected Video: {video ? video : selectedVideo?.name}</p>
               <button className={styles.deleteButton} onClick={
                  videos ? handleDeleteAsync : handleDelete}>
                  Delete Video
               </button>
            </div>
         ) : (<div className={styles.customFileInput}>
            <input type="file" accept="video/*" onChange={handleVideoChange} />
            <button className={styles.customButton}>Choose Video</button>
         </div>)}
      </div>
   );
};

export default VideoUpload;
