import { useEffect } from 'react';

const usePageSettings = (title: string) => {
   useEffect(() => {
      window.scrollTo(0, 0);
      document.title = title;

   }, [title]);

}

export default usePageSettings;
