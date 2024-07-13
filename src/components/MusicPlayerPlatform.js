import React, { useEffect, useState } from 'react';
import { ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import './AppModule.css';
import Sidebar from './sidebar';
import { storage } from '../firebase'; 

const MusicPlayerPlatform = () => {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);

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
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, []);

    const handleSongClick = (song) => {
        setCurrentSong(song.url);
    };

    return (
        <div className="homepage">
            <Sidebar />
            
            <header>
                <h2>Welcome to Listen Up music platform from <br></br> Bulgass Soft Works</h2>
                      <h2>Here you can listen and add any music you want</h2>
            </header>

            <section>
                <div className="song-list">
                    {songs.map((song) => (
                        <div key={song.url} className="song-item" onClick={() => handleSongClick(song)}>
                            {song.name}
                        </div>
                    ))}
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
