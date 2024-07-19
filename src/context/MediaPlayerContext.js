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
    const [progress, setProgress] = useState(0); // Define progress here
    const audioRef = useRef(new Audio());

    // Обновление прогресса воспроизведения
    const handleTimeUpdate = useCallback(() => {
        const audio = audioRef.current;
        if (audio.duration) {
            const currentTime = audio.currentTime;
            const duration = audio.duration;
            setProgress((currentTime / duration) * 100);
        }
    }, []);

    // Воспроизведение следующего трека
    const playNextTrack = useCallback(() => {
        if (!playlist || playlist.length === 0) return;

        let nextSong;
        if (isRandom) {
            let randomIndex = Math.floor(Math.random() * playlist.length);
            nextSong = playlist[randomIndex];
        } else {
            const currentIndex = playlist.findIndex(song => song === currentSong);
            const nextIndex = (currentIndex + 1) % playlist.length;
            nextSong = playlist[nextIndex];
        }
        setCurrentSong(nextSong);
        setIsPlaying(true);
    }, [playlist, currentSong, isRandom]);

    // Обработка завершения воспроизведения
    const handleSongEnded = useCallback(() => {
        playNextTrack();
    }, [playNextTrack]);

    // Эффект для установки и воспроизведения песни
    useEffect(() => {
        const audio = audioRef.current;
        if (!currentSong) return;

        audio.src = currentSong.url;
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Song is playing
            }).catch(error => {
                console.error('Playback error:', error);
            });
        }

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleSongEnded);

        return () => {
            audio.pause();
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleSongEnded);
        };
    }, [currentSong, handleTimeUpdate, handleSongEnded]);

    // Эффект для управления воспроизведением
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <MediaPlayerContext.Provider value={{ currentSong, setCurrentSong, playlist, setPlaylist, isPlaying, setIsPlaying, isRandom, setIsRandom, progress }}>
            {children}
        </MediaPlayerContext.Provider>
    );
};
