import React, { useState } from 'react';
import { ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import './AppModule.css';
import Sidebar from './sidebar';
import SongSearch from './MusicSearcher';
import { storage, db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useQuery } from 'react-query';
import MediaPlayer from './MediaPlayer';
import { useMediaPlayer } from '../context/MediaPlayerContext'; // Import useMediaPlayer


const fetchSongs = async () => {
    const musicRef = storageRef(storage, 'music/');
    const userFolders = await listAll(musicRef);

    const songPromises = userFolders.prefixes.map(async (userFolderRef) => {
        const userSongs = await listAll(userFolderRef);

        return Promise.all(
            userSongs.items.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef);
                return {
                    name: itemRef.name,
                    url,
                };
            })
        );
    });

    const allSongs = await Promise.all(songPromises);
    return allSongs.flat();
};

const MusicPlayerPlatform = () => {
    const { currentSong, setCurrentSong } = useMediaPlayer(); // Use context for currentSong
    const [filteredSongs, setFilteredSongs] = useState([]);
    const { currentUser } = useAuth();

    const { data: songs = [], isLoading, error } = useQuery('songs', fetchSongs, {
        onSuccess: (data) => setFilteredSongs(data),
    });

    const handleSongClick = (song) => {
        console.log('Clicked song:', song);
        setCurrentSong(song); // Use context to set current song
    };

    const addToPlaylist = async (song) => {
        if (!currentUser) {
            alert("Please log in to add songs to your playlist.");
            return;
        }

        try {
            const playlistRef = doc(db, 'playlists', currentUser.uid);
            const playlistSnap = await getDoc(playlistRef);

            if (!playlistSnap.exists()) {
                await setDoc(playlistRef, {
                    userId: currentUser.uid,
                    songs: [],
                    createdAt: Timestamp.now()
                });
            }

            await updateDoc(playlistRef, {
                songs: arrayUnion(song)
            });

            console.log("Song added to playlist!");
        } catch (error) {
            console.error("Error adding song to playlist: ", error);
        }
    };

    const handleSearch = (term) => {
        const filtered = songs.filter(song =>
            song.name && song.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredSongs(filtered);
    };

    if (isLoading) {
        return <div>
            <h1>Loading...</h1>
            </div>;
    }

    if (error) {
        return <div>
            <h1>Error loading songs:</h1>
             {error.message}</div>;
    }

    return (
        <div className="homepage">
            <Sidebar />
            <header className='header'>
                <h2>Welcome to Listen Up music platform from <br /> Bulgass Soft Works</h2>
                <h2>Here you can listen and add any music you want</h2>
            </header>

            <section className='section-platform'>
            <SongSearch onSearch={handleSearch} />
                <div className='container-music'>
                    <div className="song-list">
                        {filteredSongs.map((song, index) => (
                            <div key={index} className="song-item">
                                <div className='songPlay' onClick={() => handleSongClick(song)}>
                                    {song && song.name ? song.name.replace(".mp3", "") : ''}
                                </div>
                                <button className='btn-add' onClick={() => addToPlaylist(song)}>
                                    <img alt='add-music' className='addMusicImg' src='music-add.png' />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="content">
            {currentSong && <MediaPlayer songs={filteredSongs} currentSong={currentSong} setCurrentSong={setCurrentSong} />} 
            </footer>
        </div>
    );
};

export default MusicPlayerPlatform;
