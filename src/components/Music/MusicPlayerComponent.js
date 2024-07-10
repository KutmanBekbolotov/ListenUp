import React, { useState, useEffect } from 'react';
import './MusicPlayer.css'; // Подключаем стили для плеера

const MusicPlayer = () => {
    const [musicIndex, setMusicIndex] = useState(0); // Текущий индекс трека
    const [isPlaying, setIsPlaying] = useState(false); // Состояние воспроизведения
    const [music, setMusic] = useState(new Audio()); // Объект Audio для воспроизведения музыки
    const [progressWidth, setProgressWidth] = useState(0); // Ширина полосы прогресса
    const [currentTime, setCurrentTime] = useState(0); // Текущее время трека

    const songs = [
        {
            path: 'assets/1.mp3',
            displayName: 'The Charmer\'s Call',
            cover: 'assets/1.jpg',
            artist: 'Hanu Dixit',
        },
        {
            path: 'assets/2.mp3',
            displayName: 'You Will Never See Me Coming',
            cover: 'assets/2.jpg',
            artist: 'NEFFEX',
        },
        {
            path: 'assets/3.mp3',
            displayName: 'Intellect',
            cover: 'assets/3.jpg',
            artist: 'Yung Logos',
        }
    ];

    useEffect(() => {
        loadMusic(songs[musicIndex]); // Загружаем первый трек при загрузке компонента
    }, []);

    useEffect(() => {
        if (isPlaying) {
            music.play(); // Воспроизведение музыки, если состояние воспроизведения true
        } else {
            music.pause(); // Пауза воспроизведения, если состояние воспроизведения false
        }
    }, [isPlaying]);

    useEffect(() => {
        // Обновляем время воспроизведения в соответствии с аудио-элементом
        const updateTime = () => {
            setCurrentTime(music.currentTime);
            const progressPercent = (music.currentTime / music.duration) * 100;
            setProgressWidth(progressPercent);
        };

        music.addEventListener('timeupdate', updateTime);

        // Очищаем слушателя событий при размонтировании компонента
        return () => music.removeEventListener('timeupdate', updateTime);
    }, [music]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying); // Изменяем состояние воспроизведения
    };

    const changeMusic = (direction) => {
        let newIndex = (musicIndex + direction + songs.length) % songs.length;
        setMusicIndex(newIndex); // Обновляем индекс трека
        loadMusic(songs[newIndex]); // Загружаем новый трек
        setIsPlaying(true); // Начинаем воспроизведение нового трека
    };

    const loadMusic = (song) => {
        music.src = song.path;
        setMusic(music); // Обновляем состояние аудио-элемента
    };

    const setProgressBar = (e) => {
        const width = e.currentTarget.clientWidth;
        const clickX = e.nativeEvent.offsetX;
        music.currentTime = (clickX / width) * music.duration;
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="container">
            <div className="player-img">
                <img src={songs[musicIndex].cover} className="active" alt="cover" />
            </div>

            <h2>{songs[musicIndex].displayName}</h2>
            <h3>{songs[musicIndex].artist}</h3>

            <div className="player-progress" onClick={setProgressBar}>
                <div className="progress" style={{ width: `${progressWidth}%` }}></div>
                <div className="music-duration">
                    <span id="current-time">{formatTime(currentTime)}</span>
                    <span id="duration">{formatTime(music.duration)}</span>
                </div>
            </div>

            <div className="player-controls">
                <i className="fa-solid fa-backward" title="Previous" onClick={() => changeMusic(-1)}></i>
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} play-button`} title={isPlaying ? 'Pause' : 'Play'} onClick={togglePlay}></i>
                <i className="fa-solid fa-forward" title="Next" onClick={() => changeMusic(1)}></i>
            </div>
        </div>
    );
};

export default MusicPlayer;
