import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faBackward, faPlay, faPause, faForward, faStepForward, faRandom } from '@fortawesome/free-solid-svg-icons';
import './MediaPlayer.css';

const MediaPlayer = ({ songs, currentSong, setCurrentSong }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const [currentSongName, setCurrentSongName] = useState('');
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(new Audio()); // Initialize audioRef with a new Audio instance

    const handleTimeUpdate = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        setProgress((currentTime / duration) * 100);
    }, []);

    const playNextTrack = useCallback(() => {
        if (!songs || songs.length === 0) return;

        if (isRandom) {
            let randomIndex = Math.floor(Math.random() * songs.length);
            setCurrentSong(songs[randomIndex]);
        } else {
            const currentIndex = songs.findIndex(song => song === currentSong);
            const nextIndex = (currentIndex + 1) % songs.length;
            setCurrentSong(songs[nextIndex]);
        }
        setIsPlaying(true);
    }, [songs, currentSong, isRandom, setCurrentSong]);

    const handleSongEnded = useCallback(() => {
        playNextTrack();
    }, [playNextTrack]);

    useEffect(() => {
        if (!currentSong) return;

        audioRef.current.src = currentSong.url;
        setCurrentSongName(currentSong.name ? currentSong.name.replace('.mp3', '') : '');

        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started
            }).catch(error => {
                console.error('Playback error:', error);
            });
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

    const toggleRandom = () => {
        setIsRandom(!isRandom);
    };

    if (!currentSong) {
        return <div className="media-controls">No song selected.</div>;
    }

    return (
        <div className="media-controls">
            <div className='container-media'>
            <button className="back-button media-button" onClick={playPreviousTrack}>
                <FontAwesomeIcon icon={faStepBackward} className="button-icons" />
                <span className="button-text milli">Back</span>
            </button>

            <button className="rewind-button media-button" onClick={playPreviousTrack}>
                <FontAwesomeIcon icon={faBackward} className="button-icons" />
                <span className="button-text milli">Rewind</span>
            </button>

            <button className="play-button media-button" onClick={playPauseToggle}>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="button-icons delta" />
                <span className="button-text milli">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button className="fast-forward-button media-button" onClick={playNextTrack}>
                <FontAwesomeIcon icon={faForward} className="button-icons" />
                <span className="button-text milli">Forward</span>
            </button>

            <button className="skip-button media-button" onClick={playNextTrack}>
                <FontAwesomeIcon icon={faStepForward} className="button-icons" />
                <span className="button-text milli">Skip</span>
            </button>

            <button className="random-button media-button" onClick={toggleRandom}>
                <FontAwesomeIcon icon={faRandom} className={`button-icons ${isRandom ? 'active' : ''}`} />
                <span className="button-text milli">Random</span>
            </button>
            </div>

            <div className="media-progress">
                <div className="progress-bar-wrapper progress">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="progress-time-current milli">
                    {audioRef.current ? audioRef.current.currentTime.toFixed(0) + 's' : '0s'}
                </div>
                <div className="progress-time-total milli">
                    {audioRef.current ? audioRef.current.duration.toFixed(0) + 's' : '0s'}
                </div>
            </div>
            <div className="current-song-name">
                {currentSongName}
            </div>
        </div>
    );
};

export default MediaPlayer;
