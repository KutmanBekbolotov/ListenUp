import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../sidebar';

const PlayList = () => {
    const { currentUser } = useAuth();
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                if (currentUser) {
                    const playlistRef = doc(db, 'playlists', currentUser.uid);
                    const playlistDoc = await getDoc(playlistRef);

                    if (playlistDoc.exists()) {
                        const playlistData = playlistDoc.data().songs || [];
                        setPlaylist(playlistData);
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

    return (
        <div className="playlist-page">
            <Sidebar />
            <h2>Your Playlist</h2>
            <ul>
                {playlist.map((song, index) => (
                    <li key={index}>
                        <div className="playlist-song">
                            <p>{song.name}</p>
                            <audio controls src={song.url} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayList;
