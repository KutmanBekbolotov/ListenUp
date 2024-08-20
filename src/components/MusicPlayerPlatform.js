import React, { useState, useEffect, useCallback } from 'react';
import { ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import './AppModule.css'; 
import Sidebar from './SubComponents/Sidebar/sidebar';
import SongSearch from './SubComponents/Searcher/MusicSearcher';
import { storage, db } from '../firebase';
import MediaPlayer from './SubComponents/MediaPlayer/MediaPlayer';
import Modal from './SubComponents/ModalWindows/Modal';
import Loader from "./SubComponents/LoaderAnimation/loader";
import Skeletonchik from "./SubComponents/Skeleton/skeletonchik"; 
import { useAuth } from '../context/AuthContext'; 

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
    const [currentSong, setCurrentSong] = useState(null);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [allSongs, setAllSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [skeleton, setSkeleton] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { currentUser } = useAuth(); 

    useEffect(() => {
        const loadSongs = async () => {
            try {
                const songs = await fetchSongs();
                setAllSongs(songs);
                setFilteredSongs(songs);
                setLoading(false);
            } catch (error) {
                console.error("Error loading songs: ", error);
                setLoading(false);
            }
        };

        loadSongs();

        setTimeout(() => {
            setSkeleton(false);
        }, 1000);
    }, []);

    const handleSearch = useCallback((term) => {
        const filtered = allSongs.filter(song =>
            song.name && song.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredSongs(filtered);
    }, [allSongs]);

    const handleSongClick = useCallback((song) => {
        console.log('Clicked song:', song);
        setCurrentSong(song);
    }, []);

    const addToPlaylist = useCallback(async (song) => {
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

            setModalMessage('Song added to playlist!');
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error adding song to playlist: ", error);
        }
    }, [currentUser]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="homepage">
            <Sidebar />
            <header className='redheader'>
                <h2>Just Listen up</h2>
                <pre>Version beta 0.0.1</pre>
            </header>

            <section className='section-platform'>
                {
                    skeleton ? <Skeletonchik /> :
                        <div>
                            <SongSearch onSearch={handleSearch} />
                            <div className='container-music'>
                                <div className="song-list">
                                    {filteredSongs.map((song, index) => (
                                        <div key={index} className="song-item">
                                            <div className='songPlay' onClick={() => handleSongClick(song)}>
                                                {song.name ? song.name.replace(".mp3", "") : 'Unknown Song'}
                                            </div>
                                            <button className='btn-add' onClick={() => addToPlaylist(song)}>
                                                <img alt='add-music' className='addMusicImg' src='music-add.png' />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                }
            </section>
            <footer className="content">
                {currentSong && <MediaPlayer
                    songs={filteredSongs}
                    currentSong={currentSong}
                    setCurrentSong={setCurrentSong}
                />}
            </footer>
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                message={modalMessage} 
            />
        </div>
    );
};

export default MusicPlayerPlatform;
