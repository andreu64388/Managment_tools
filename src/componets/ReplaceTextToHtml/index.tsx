// @ts-ignore
import styles from './ReplaceTextToHtml.module.scss';

export const ReplaceTextToHtml = ({ data }: any) => {
   const transformText = (text: string) => {
      return text
         ? text?.replace(/<p><br><\/p>/g, '').replace(/<p>/g, `<p class=${styles.text}>`)
         : '';
   };

   const processedText = transformText(data?.task?.descriptions);

   return (
      <div dangerouslySetInnerHTML={{ __html: processedText }} />
   );
};
