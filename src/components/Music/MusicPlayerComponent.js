import React, { useEffect, useRef } from 'react';

const MusicPlayerComponent = ({ url }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (url && audioRef.current) {
            audioRef.current.src = url;
            audioRef.current.play();
        }
    }, [url]);

    return (
        <div className="music-player">
            <audio ref={audioRef} controls />
        </div>
    );
};

export default MusicPlayerComponent;
