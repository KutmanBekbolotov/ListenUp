import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; 
import { useMediaPlayer } from '../../context/MediaPlayerContext';
import MediaPlayer from '../MediaPlayer'; 
import './GenreSongs.css'; 

const GenreSongs = () => {
    const { genreName } = useParams(); 
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { setCurrentSong, setPlaylist } = useMediaPlayer(); // Используйте хук для контекста

    useEffect(() => {
        const fetchSongs = async () => {
            if (!genreName) {
                setError("Genre is not specified.");
                setLoading(false);
                return;
            }

            try {
                const songsRef = collection(db, 'songs');
                const q = query(songsRef, where('genre', '==', genreName));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setSongs([]); 
                } else {
                    const songsList = querySnapshot.docs.map(doc => doc.data());
                    setSongs(songsList); 
                }
            } catch (err) {
                console.error("Error fetching songs: ", err);
                setError("Failed to load songs."); 
            } finally {
                setLoading(false); 
            }
        };

        fetchSongs();
    }, [genreName]);

    const handlePlaySong = (song) => {
        setCurrentSong(song); 
        setPlaylist(songs);  
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <div className="genre-songs-page">
            <h2>{genreName} Songs</h2>
            {songs.length > 0 ? (
                <ul className="songs-list">
                    {songs.map((song, index) => (
                        <li key={index} onClick={() => handlePlaySong(song)}>
                            {song.title} by {song.artist}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No songs available for this genre.</p>
            )}
            <MediaPlayer />
        </div>
    );
};

export default GenreSongs;
