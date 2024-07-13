import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faBackward, faPlay, faPause, faForward, faStepForward, faRandom } from '@fortawesome/free-solid-svg-icons';
import './MediaPlayer.css';

const MediaPlayer = ({ songs }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [currentSongName, setCurrentSongName] = useState('');
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!songs || songs.length === 0) return; 

    audioRef.current = new Audio(songs[currentTrackIndex].url);
    setCurrentSongName(songs[currentTrackIndex].name.replace('.mp3', ''));

    audioRef.current.addEventListener('timeupdate', () => {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100);
    });

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, [currentTrackIndex, isPlaying, songs]);

  const playPauseToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextTrack = () => {
    if (!songs || songs.length === 0) return; // Проверка наличия данных

    if (isRandom) {
      let randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prevIndex) => (prevIndex === songs.length - 1 ? 0 : prevIndex + 1));
    }
    setIsPlaying(true);
  };

  const playPreviousTrack = () => {
    if (!songs || songs.length === 0) return; // Проверка наличия данных

    setCurrentTrackIndex((prevIndex) => (prevIndex === 0 ? songs.length - 1 : prevIndex - 1));
    setIsPlaying(true);
  };

  const toggleRandom = () => {
    setIsRandom(!isRandom);
  };

  if (!songs || songs.length === 0) {
    return <div>No songs to play.</div>;
  }

  return (
    <div className="media-controls">
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
