
import React, { useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useCallback, useMemo } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../sidebar';
import './PlayList.css';
import SongSearch from '../MusicSearcher';
import MediaPlayer from '../MediaPlayer';
import { useMediaPlayer } from '../../context/MediaPlayerContext';

const fetchPlaylist = async (uid) => {
    const playlistRef = doc(db, 'playlists', uid);
    const playlistDoc = await getDoc(playlistRef);

    if (playlistDoc.exists()) {
        return playlistDoc.data().songs || [];
    } else {
        throw new Error('Плейлист пользователя не найден.');
    }
};
//const
const PlayList = () => {
    const { currentUser } = useAuth();
    const { currentSong, setCurrentSong } = useMediaPlayer();
    const [filteredPlaylist, setFilteredPlaylist] = useState([]);

    const { data: playlist = [], isLoading, error } = useQuery(
        ['playlist', currentUser?.uid],
        () => fetchPlaylist(currentUser.uid),
        {
            enabled: !!currentUser,
            onSuccess: (data) => setFilteredPlaylist(data),
        }
    );
    const removeFromPlaylist = async (song) => {
        if (!currentUser) {
            alert("Please log in to manage your playlist.");
            return;
        }
    
        try {
            const playlistRef = doc(db, 'playlists', currentUser.uid);
            const playlistSnap = await getDoc(playlistRef);
    
            if (!playlistSnap.exists()) {
                console.log("Playlist does not exist for current user.");
                return;
            }
    
            const playlistData = playlistSnap.data();
            const songs = playlistData.songs;
    
            // Find index of song with given songId
            const indexToRemove = songs.findIndex(item => item.id === song.uid);
    
            if (indexToRemove === -1) {
                console.log("Song not found in playlist.");
                return;
            }
            document.getElementById('remove')(song).remove();
                songs.splice(indexToRemove, 1);
    
            await updateDoc(playlistRef, {
                songs: songs
            });
    
            console.log("Song removed from playlist!");
        } catch (error) {
            console.error("Error removing song from playlist: ", error);
        }
        document.getElementById('remove').remove()
        
    };

    const handleSongClick = useCallback((song) => {
        setCurrentSong(song);
    }, [setCurrentSong]);

    const memoizedFilteredPlaylist = useMemo(() => (
        filteredPlaylist.map((song, index) => (
            <li key={index} className='song-item'>
                <div className="playlist-song" onClick={() => handleSongClick(song)}>
                    <p>{song.name.replace(".mp3", "")}</p>
                </div>
            </li>
        ))
    ), [filteredPlaylist, handleSongClick]);

    const handleSearch = useCallback((searchTerm) => {
        if (!playlist) return;

        if (searchTerm.trim() === '') {
            setFilteredPlaylist(playlist);
        } else {
            const filtered = playlist.filter(song =>
                song.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPlaylist(filtered);
        }
    }, [playlist]);

    if (isLoading) {
        return <div><h1>Loading...</h1></div>;
    }

    if (error) {
        return <div>Error loading playlist: {error.message}</div>;
    }

    return (
        <div className="playlist-page">
            <Sidebar />
            <SongSearch onSearch={handleSearch} />
            <h2>Your Playlist</h2>
            <div className='container-music'>
                <ul className='song-list'>

                    {filteredPlaylist.map((song, index) => (
                        <li key={index} className='song-item'>
                            <div className="playlist-song" onClick={() => handleSongClick(song)}>
                                <p>{song.name.replace(".mp3", "")}</p>
                            </div>
                            <button className='btn-add' onClick={() => removeFromPlaylist(song)}>
                                    <img alt='add-music' className='addMusicImg' src='music-add.png' />
                            </button>
                        </li>
                    ))}

                    {memoizedFilteredPlaylist}
                </ul>
            </div>
                    <MediaPlayer
                        songs={filteredPlaylist}
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                    />
        </div>
    );
};

export default PlayList;
