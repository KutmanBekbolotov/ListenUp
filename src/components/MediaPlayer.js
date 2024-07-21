import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faForward, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import './MediaPlayer.css';

const MediaPlayer = ({ songs, currentSong, setCurrentSong }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(new Audio()); 

    const handleTimeUpdate = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        setProgress((currentTime / duration) * 100);
    }, []);

    const playNextTrack = useCallback(() => {
        if (!songs || songs.length === 0) return;

        const currentIndex = songs.findIndex(song => song === currentSong);
        const nextIndex = (currentIndex + 1) % songs.length;
        setCurrentSong(songs[nextIndex]);
        setIsPlaying(true);
    }, [songs, currentSong, setCurrentSong]);

    const handleSongEnded = useCallback(() => {
        playNextTrack();
    }, [playNextTrack]);

    useEffect(() => {
        if (!currentSong) return;

        audioRef.current.src = currentSong.url;

        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {}).catch(error => console.error('Playback error:', error));
        }

        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.addEventListener('ended', handleSongEnded);

        const audioElement = audioRef.current;
        return () => {
            audioElement.pause();
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
            audioElement.removeEventListener('ended', handleSongEnded);
        };
    }, [currentSong, handleTimeUpdate, handleSongEnded]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const playPauseToggle = () => {
        setIsPlaying(!isPlaying);
    };

    const playPreviousTrack = () => {
        if (!songs || songs.length === 0) return;

        const currentIndex = songs.findIndex(song => song === currentSong);
        const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
        setCurrentSong(songs[prevIndex]);
        setIsPlaying(true);
    };

    if (!currentSong) {
        return <div className="media-controls"></div>;
    }

    return (
        <div className="media-controls">
            <div className="current-song-name">
                {currentSong.name ? currentSong.name.replace('.mp3', '') : ''}
            </div>
            <div className="progress-bar-wrapper">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="controls">
                <button className="control-button" onClick={playPreviousTrack}>
                    <FontAwesomeIcon icon={faStepBackward} />
                </button>
                <button className="control-button" onClick={playPauseToggle}>
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                <button className="control-button" onClick={playNextTrack}>
                    <FontAwesomeIcon icon={faForward} />
                </button>
            </div>
        </div>
    );
};

export default MediaPlayer;
