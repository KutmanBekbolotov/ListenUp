import React, { useEffect, useState } from 'react';
import { ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import './AppModule.css';
import Sidebar from './sidebar';
import SongSearch from './MusicSearcher'; 
import { storage, db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import MediaPlayer from './MediaPlayer';

const MusicPlayerPlatform = () => {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
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
                const flattenedSongs = allSongs.flat();

                setSongs(flattenedSongs);
                setFilteredSongs(flattenedSongs);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, []);

    const handleSongClick = (song) => {
        setCurrentSong(song.url);
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
    
            setSongs([...songs, song]);
    
            console.log("Song added to playlist!");
        } catch (error) {
            console.error("Error adding song to playlist: ", error);
        }
    };

    const handleSearch = (term) => {
        const filtered = songs.filter(song =>
            song.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredSongs(filtered);
    };

    return (
        <div className="homepage">
            <Sidebar />
            <SongSearch onSearch={handleSearch} />
            <MediaPlayer songs={filteredSongs} />
            
            <header className='header'>
                <h2>Welcome to Listen Up music platform from <br /> Bulgass Soft Works</h2>
                <h2>Here you can listen and add any music you want</h2>
            </header>

            <section>
                <div className='container-music'>
                    <div className="song-list">
                        {filteredSongs.map((song, index) => (
                            <div key={index} className="song-item">
                                <div className='songPlay' onClick={() => handleSongClick(song)}>
                                    {song.name.replace(".mp3", "")}
                                </div>
                                <button className='btn-add' onClick={() => addToPlaylist(song)}>
                                    <img alt='add-music' className='addMusicImg' src='music-add.png' />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {currentSong && <audio controls autoPlay src={currentSong} />}
            </section>

            <footer className="content">
                <p>Explore genres, discover new artists, and find your favorite songs.</p>
                <p>&copy; 2024 Listen Up. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default MusicPlayerPlatform;
