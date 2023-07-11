import { useEffect, useState } from 'react';

export const useResize = (id) => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return width;
};
