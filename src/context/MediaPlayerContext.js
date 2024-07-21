import React, { createContext, useState, useCallback, useContext } from 'react';

const MediaPlayerContext = createContext();

export const MediaPlayerProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playlist, setPlaylist] = useState([]); // Добавляем состояние для плейлиста

    const playPreviousTrack = useCallback(() => {
        if (!playlist || playlist.length === 0) return;

        const currentIndex = playlist.findIndex(song => song === currentSong);
        const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
        setCurrentSong(playlist[prevIndex]);
        setIsPlaying(true);
    }, [playlist, currentSong]);

    const playNextTrack = useCallback(() => {
        if (!playlist || playlist.length === 0) return;

        const currentIndex = playlist.findIndex(song => song === currentSong);
        const nextIndex = (currentIndex + 1) % playlist.length;
        setCurrentSong(playlist[nextIndex]);
        setIsPlaying(true);
    }, [playlist, currentSong]);

    return (
        <MediaPlayerContext.Provider value={{ currentSong, setCurrentSong, isPlaying, setIsPlaying, playPreviousTrack, playNextTrack, playlist, setPlaylist }}>
            {children}
        </MediaPlayerContext.Provider>
    );
};

export const useMediaPlayer = () => useContext(MediaPlayerContext);
