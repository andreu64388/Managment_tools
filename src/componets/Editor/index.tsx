import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//@ts-ignore
import styles from './Editor.module.scss';

const Editor = ({ value, onChange }: any) => {
   const modules = {
      toolbar: [
         ['bold', 'italic', 'underline', 'strike'],
         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
         ['link'], // Добавлено форматирование для вставки ссылок
      ],
   };

   const formats = [
      'header', 'bold', 'italic', 'underline', 'strike',
      'list', 'bullet', 'indent', 'link', // Добавлен формат для вставки ссылок
   ];

   const handleChange = (content: any) => {
      onChange(content);
   };

   return (
      <div className={styles.editorContainer}>
         <div className={styles.header}>
         </div>
         <div className={styles.editor}>
            <div>
               <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={handleChange}
                  modules={modules}
                  formats={formats}
                  style={{ height: "180px" }}
               />
            </div>
         </div>
      </div>
   );
};

export default Editor;
