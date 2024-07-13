import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; 
import { useAuth } from '../../context/AuthContext'; 
import Sidebar from '../sidebar';

const PlayList = () => {
    const { currentUser } = useAuth();
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const userPlaylistRef = collection(db, 'playlists', currentUser.uid, 'songs');
                const playlistSnapshot = await getDocs(userPlaylistRef);
                const playlistData = playlistSnapshot.docs.map(doc => doc.data());
                setPlaylist(playlistData);
            } catch (error) {
                console.error('Error fetching playlist:', error);
            }
        };

        fetchPlaylist();
    }, [currentUser]);

    return (
        <div className="playlist-page">
            <Sidebar/>
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
