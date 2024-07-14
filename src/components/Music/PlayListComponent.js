import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../sidebar';
import './PlayList.css';
import SongSearch from '../MusicSearcher';
import MediaPlayer from '../MediaPlayer';

const fetchPlaylist = async (uid) => {
    const playlistRef = doc(db, 'playlists', uid);
    const playlistDoc = await getDoc(playlistRef);

    if (playlistDoc.exists()) {
        return playlistDoc.data().songs || [];
    } else {
        throw new Error('Плейлист пользователя не найден.');
    }
};

const PlayList = () => {
    const { currentUser } = useAuth();
    const [filteredPlaylist, setFilteredPlaylist] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);

    const { data: playlist = [], isLoading, error } = useQuery(
        ['playlist', currentUser?.uid],
        () => fetchPlaylist(currentUser.uid),
        {
            enabled: !!currentUser,
            onSuccess: (data) => setFilteredPlaylist(data),
        }
    );

    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === '') {
            setFilteredPlaylist(playlist);
        } else {
            const filtered = playlist.filter(song =>
                song.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPlaylist(filtered);
        }
    };

    const handleSongClick = (song) => {
        setCurrentSong(song);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading playlist: {error.message}</div>;
    }

    return (
        <div className="playlist-page">
            <Sidebar />
            <SongSearch onSearch={handleSearch} />
            <MediaPlayer
                songs={filteredPlaylist}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
            />
            <h2>Your Playlist</h2>
            <div className='container-music'>
                <ul className='song-list'>
                    {filteredPlaylist.map((song, index) => (
                        <li key={index} className='song-item'>
                            <div className="playlist-song" onClick={() => handleSongClick(song)}>
                                <p>{song.name.replace(".mp3", "")}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlayList;
