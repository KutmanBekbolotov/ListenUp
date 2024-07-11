import React, { useEffect, useState } from 'react';
import { ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import './AppModule.css';
import Sidebar from './sidebar'; // Импортируем компонент Sidebar
import { storage } from '../firebase'; // Импортируем storage из кастомного firebase.js

const MusicPlayerPlatform = () => {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const listRef = storageRef(storage, 'music/кутман'); // Используем storageRef для работы с Firebase Storage
                const songList = await listAll(listRef);
    
                const songPromises = songList.items.map(async (itemRef) => {
                    const url = await getDownloadURL(itemRef);
                    return {
                        name: itemRef.name,
                        url,
                    };
                });
    
                const songs = await Promise.all(songPromises);
                setSongs(songs);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };
    
        fetchSongs();
    }, []);

    const handleSongClick = (song) => {
        setCurrentSong(song.url);
    };

    return (
        <div className="homepage">
            <Sidebar />
            
            <header>
                <h2>Welcome to Listen Up music platform from <br></br> Bulgass Soft Works</h2>
            </header>

            <section className="content">
                <h2>Here you can listen and add any music you want</h2>
                <p>Explore genres, discover new artists, and find your favorite songs.</p>
                
                    <p>&copy; 2024 Listen Up. All rights reserved.</p>

            </section>

            <footer>
                <div className="song-list">
                    {songs.map((song) => (
                        <div key={song.url} className="song-item" onClick={() => handleSongClick(song)}>
                            {song.name}
                        </div>
                    ))}
                </div>
                {currentSong && <audio controls autoPlay src={currentSong} />}
            </footer>
        </div>
    );
}

export default MusicPlayerPlatform;
