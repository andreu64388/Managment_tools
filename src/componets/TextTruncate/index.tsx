import React, { FC, useState, useEffect } from 'react';
//@ts-ignore
import styles from './TextTruncate.module.scss';

interface TextTruncateProps {
    text: string;
    maxCharactersDesktop: number;
    maxCharactersTablet: number;
    maxCharactersMobile: number;
    maxCharactersMobileMin:number;
}

export const TextTruncate: FC<TextTruncateProps> = ({ text, maxCharactersDesktop, maxCharactersTablet, maxCharactersMobile,maxCharactersMobileMin }) => {
    const [maxCharacters, setMaxCharacters] = useState(maxCharactersDesktop);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth >= 800) {
                setMaxCharacters(maxCharactersDesktop);
            } else if (screenWidth < 800 && screenWidth >= 689) {
                setMaxCharacters(maxCharactersTablet);
            }
            else if (screenWidth < 689 && screenWidth >= 450) {
                setMaxCharacters(maxCharactersMobile);
            }
            else {
                setMaxCharacters(maxCharactersMobileMin);
            }
        };

        handleResize(); 

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [maxCharactersDesktop, maxCharactersTablet, maxCharactersMobile]);

    return (
        <div className={`${styles.textTruncate}`}>
            {text.length > maxCharacters ? `${text.slice(0, maxCharacters)}...` : text}
        </div>
    );
};
