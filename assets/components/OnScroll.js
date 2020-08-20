import React, { useEffect, useState } from 'react';

const useScroll = () => {
    const [yState, setState] = useState(0);

    const onScroll = () => {
        setState(window.scrollY);
    }

    useEffect (() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return useScroll;
}

export default useScroll;
