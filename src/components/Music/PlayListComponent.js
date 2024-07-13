import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../sidebar';
import './PlayList.css';
import SongSearch from '../MusicSearcher';
import MediaPlayer from '../MediaPlayer';

const PlayList = () => {
    const { currentUser } = useAuth();
    const [playlist, setPlaylist] = useState([]);
    const [filteredPlaylist, setFilteredPlaylist] = useState([]);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                if (currentUser) {
                    const playlistRef = doc(db, 'playlists', currentUser.uid);
                    const playlistDoc = await getDoc(playlistRef);

                    if (playlistDoc.exists()) {
                        const playlistData = playlistDoc.data().songs || [];
                        setPlaylist(playlistData);
                        setFilteredPlaylist(playlistData); // Устанавливаем фильтрованный плейлист изначально равным всем песням
                    } else {
                        console.log('Плейлист пользователя не найден.');
                    }
                }
            } catch (error) {
                console.error('Error fetching playlist:', error);
            }
        };

        fetchPlaylist();
    }, [currentUser]);

    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === '') {
            setFilteredPlaylist(playlist); // Если строка поиска пуста, показываем весь плейлист
        } else {
            const filtered = playlist.filter(song =>
                song.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPlaylist(filtered); // Иначе фильтруем плейлист по поисковому запросу
        }
    };

    return (
        <div className="playlist-page">
            <Sidebar />
            <SongSearch onSearch={handleSearch} />
            <MediaPlayer songs={filteredPlaylist} /> {/* Передаем отфильтрованный плейлист в MediaPlayer */}
            <h2>Your Playlist</h2>
            <div className='container-music'>
                <ul>
                    {filteredPlaylist.map((song, index) => (
                        <li key={index}>
                            <div className="playlist-song">
                                <p>{song.name.replace(".mp3", "")}</p>
                                <audio controls src={song.url} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlayList;
