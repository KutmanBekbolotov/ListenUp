import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import './GenreSongs.css'; 
import MediaPlayer from '../MediaPlayer';
import Loader from "../loader";

const GenreSongs = () => {
  const { genreName } = useParams();
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);

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

  useEffect(() => {
    setFilteredSongs(songs);
  }, [songs]);

  const handleSongClick = useCallback((song) => {
    setCurrentSong(song);
  }, []);

  if (loading) {
    return <Loader/>;
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
            <li key={index} onClick={() => handleSongClick(song)}>
              {song.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No songs available for this genre.</p>
      )}
      <div className="media-player-container">
        <MediaPlayer
          songs={filteredSongs}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
      </div>
    </div>
  );
};

export default GenreSongs;
