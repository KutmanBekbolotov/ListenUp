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
import Loader from "../loader";

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

    const removeFromPlaylist = useCallback(async (song) => {
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

            const indexToRemove = songs.findIndex(item => item.id === song.id);

            if (indexToRemove === -1) {
                console.log("Song not found in playlist.");
                return;
            }

            songs.splice(indexToRemove, 1);

            await updateDoc(playlistRef, {
                songs: songs
            });

            console.log("Song removed from playlist!");
            setFilteredPlaylist(songs);
        } catch (error) {
            console.error("Error removing song from playlist: ", error);
        }
    }, [currentUser]);

    const handleSongClick = useCallback((song) => {
        setCurrentSong(song);
    }, [setCurrentSong]);

    const memoizedFilteredPlaylist = useMemo(() => (
        filteredPlaylist.map((song, index) => (
            <li key={index} className='song-item'>
                <div className="playlist-song" onClick={() => handleSongClick(song)}>
                    <p>{song.name.replace(".mp3", "")}</p>
                </div>
                <button className='btn-delete' onClick={() => removeFromPlaylist(song)}>
                    <img alt='delete-music' className='deleteMusic' src='music-remove.png' />
                </button>
            </li>
        ))
    ), [filteredPlaylist, handleSongClick, removeFromPlaylist]);

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
        return <Loader/>;
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
