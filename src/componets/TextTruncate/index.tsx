import React, {FC, useState, useEffect} from 'react';
//@ts-ignore
import styles from './TextTruncate.module.scss';

interface TextTruncateProps {
    text: string;
}

export const TextTruncate: FC<TextTruncateProps> = ({text}) => {
    const [maxCharacters, setMaxCharacters] = useState(50);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 800) {
                setMaxCharacters(50);
            } else if (screenWidth < 800 && screenWidth >= 689) {
                setMaxCharacters(40);
            } else {
                setMaxCharacters(30);
            }
        };

        handleResize(); // Проверить ширину экрана при первой загрузке

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`${styles.textTruncate}`}>
            {text.length > maxCharacters ? `${text.slice(0, maxCharacters)}...` : text}
        </div>
    );
};
