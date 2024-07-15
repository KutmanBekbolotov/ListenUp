import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const MediaPlayerContext = createContext();

export const useMediaPlayer = () => {
    return useContext(MediaPlayerContext);
};

export const MediaPlayerProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const audioRef = useRef(new Audio());

    const handleTimeUpdate = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        setProgress((currentTime / duration) * 100);
    }, []);

    const playNextTrack = useCallback(() => {
        if (!playlist || playlist.length === 0) return;

        if (isRandom) {
            let randomIndex = Math.floor(Math.random() * playlist.length);
            setCurrentSong(playlist[randomIndex]);
        } else {
            const currentIndex = playlist.findIndex(song => song === currentSong);
            const nextIndex = (currentIndex + 1) % playlist.length;
            setCurrentSong(playlist[nextIndex]);
        }
        setIsPlaying(true);
    }, [playlist, currentSong, isRandom, setCurrentSong]);

    const handleSongEnded = useCallback(() => {
        playNextTrack();
    }, [playNextTrack]);

    useEffect(() => {
        if (!currentSong) return;

        audioRef.current.src = currentSong.url;

        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
            }).catch(error => {
                console.error('Playback error:', error);
            });
        }

        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.addEventListener('ended', handleSongEnded);

        return () => {
            audioRef.current.pause();
            audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.removeEventListener('ended', handleSongEnded);
        };
    }, [currentSong, handleTimeUpdate, handleSongEnded]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <MediaPlayerContext.Provider value={{ currentSong, setCurrentSong, playlist, setPlaylist, isPlaying, setIsPlaying, isRandom, setIsRandom, audioRef }}>
            {children}
        </MediaPlayerContext.Provider>
    );
};
