import React, { FC, useState, useEffect, memo } from 'react';
//@ts-ignore
import styles from './TextTruncate.module.scss';

interface TextTruncateProps {
    text: string | undefined;
    maxCharactersDesktop?: number;
    maxCharactersTablet?: number;
    maxCharactersMobile?: number;
    maxCharactersMobileMin?: number;
    breakpointTablet?: number;
    breakpointMobile?: number;
}

const TextTruncate: FC<TextTruncateProps> = ({
    text = "",
    maxCharactersDesktop = 100,
    maxCharactersTablet = 50,
    maxCharactersMobile = 25,
    maxCharactersMobileMin = 10,
    breakpointTablet = 800,
    breakpointMobile = 689
}) => {
    const [maxCharacters, setMaxCharacters] = useState(maxCharactersDesktop);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth >= breakpointTablet) {
                setMaxCharacters(maxCharactersDesktop);
            } else if (screenWidth < breakpointTablet && screenWidth >= breakpointMobile) {
                setMaxCharacters(maxCharactersTablet);
            } else if (screenWidth < breakpointMobile && screenWidth >= 450) {
                setMaxCharacters(maxCharactersMobile);
            } else {
                setMaxCharacters(maxCharactersMobileMin);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [maxCharactersDesktop, maxCharactersTablet, maxCharactersMobile, maxCharactersMobileMin, breakpointTablet, breakpointMobile]);

    return (
        <div className={`${styles.textTruncate}`}>
            {text?.length > maxCharacters ? `${text.slice(0, maxCharacters)}...` : text}
        </div>
    );
};


export default memo(TextTruncate);