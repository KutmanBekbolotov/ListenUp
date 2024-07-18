import React, { useState, useCallback, useMemo } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
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
    
            // Найти индекс песни с заданным songId
            const indexToRemove = songs.findIndex(item => item.uid === song.uid);
    
            if (indexToRemove === -1) {
                console.log("Song not found in playlist.");
                return;
            }
            document.getElementById('remove')(song).remove();
                songs.splice(indexToRemove, 1);
    
            // Update the playlist document
            await updateDoc(playlistRef, {
                songs: songs
            });
    
            // Обновить состояние компонента
            setFilteredPlaylist(songs);
    
            console.log("Песня удалена из плейлиста!");
        } catch (error) {
            console.error("Ошибка при удалении песни из плейлиста:", error);
        }
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
                        <li key={index} id={`song-${song.uid}`} className='song-item'>
                            <div className="playlist-song" onClick={() => handleSongClick(song)}>
                                <p>{song.name.replace(".mp3", "")}</p>
                            </div>
                            <div className='btn-delete'>
                            <button className='btn-add' onClick={() => removeFromPlaylist(song)}>
                                    <img alt='remove-music' className='deleteMusic' src='music-remove.png' />
                            </button>
                            </div>
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
