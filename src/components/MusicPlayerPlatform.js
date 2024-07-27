import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import './AppModule.css'; 
import Sidebar from './sidebar';
import SongSearch from './MusicSearcher';
import { storage, db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import {setLogger, useQuery} from 'react-query';
import MediaPlayer from './MediaPlayer';
import Modal from './Modal';
import Loader from "./loader";
import Skeletonchik from "./skeletonchik"; // Импортируйте компонент модального окна

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [skeleton, setSkeleton] = useState (true);
    const { currentUser } = useAuth();

    useEffect(()=>{
        setTimeout(()=>{
            setSkeleton(false)
        }, 1000)
    }, []);

    const { data: songs = [], isLoading, error } = useQuery('songs', fetchSongs, {
        onSuccess: (data) => setFilteredSongs(data),
    });

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

            // Открыть модальное окно с уведомлением
            setModalMessage('Song added to playlist!');
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error adding song to playlist: ", error);
        }
    }, [currentUser]);

    const handleSearch = useCallback((term) => {
        const filtered = songs.filter(song =>
            song.name && song.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredSongs(filtered);
    }, [songs]);

    const memoizedFilteredSongs = useMemo(() => (
        filteredSongs.map((song, index) => (
            <div key={index} className="song-item">
                <div className='songPlay' onClick={() => handleSongClick(song)}>
                    {song.name ? song.name.replace(".mp3", "") : 'Unknown Song'}
                </div>
                <button className='btn-add' onClick={() => addToPlaylist(song)}>
                    <img alt='add-music' className='addMusicImg' src='music-add.png' />
                </button>
            </div>
        ))
    ), [filteredSongs, handleSongClick, addToPlaylist]);


    if (isLoading) {
        return <Loader/>
    }
    if (error) {
        return <div><h1>Error loading songs:</h1>{error.message}</div>;
    }

    return (
        <div className="homepage">
            <Sidebar />
            <header className='redheader'>
                <h2>Welcome to Listen Up music platform from <br /> Bulgass Soft Works</h2>
                <h2>Here you can listen and add any music you want</h2>
            </header>

            <section className='section-platform'>
                <SongSearch onSearch={handleSearch} />
                {
                    skeleton ? <Skeletonchik/> :
                        <div className='container-music'>
                            <div className="song-list">
                                {memoizedFilteredSongs}
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
