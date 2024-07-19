import React, { useState, useCallback } from 'react';
import { ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { storage, db } from '../../firebase'; // Обновите путь, если нужно

// Список жанров
const genres = [
  'Rock', 'Pop', 'Electronic', 'Hip-Hop', 'Country',
  'Party-music', 'K-pop', 'Sleep', 'Love', 'Jazz',
  'Classical', 'Kids&Family', 'Travel', 'Gaming', 'Anime',
  'Soul', 'Top-Chart', 'Training'
];

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

const UpdateMetadataComponent = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const { data: songs = [], isLoading, error } = useQuery('songs', fetchSongs);

  const handleSongSelect = useCallback((song) => {
    setSelectedSong(song);
    setSelectedGenre(song.genre || ''); // Устанавливаем жанр для выбранной песни
  }, []);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const saveGenre = async () => {
    if (selectedSong) {
      try {
        const songRef = doc(db, 'songs', selectedSong.name); // Обновляем документ по имени песни

        const songSnap = await getDoc(songRef);

        if (songSnap.exists()) {
          // Обновляем жанр существующей песни
          await updateDoc(songRef, { genre: selectedGenre });
          console.log("Document updated with ID: ", songRef.id);
        } else {
          // Добавляем новую песню с жанром
          const songData = {
            title: selectedSong.name.split('.').slice(0, -1).join('.'),
            artist: 'Unknown Artist',
            genre: selectedGenre || 'Unknown Genre',
            url: selectedSong.url
          };

          await setDoc(songRef, songData);
          console.log("Document written with ID: ", songRef.id);
        }
      } catch (error) {
        console.error("Error saving genre: ", error);
      }
    }
  };

  if (isLoading) {
    return <div><h1>Loading...</h1></div>;
  }

  if (error) {
    return <div><h1>Error loading songs:</h1>{error.message}</div>;
  }

  return (
    <div>
      <h1>Update Song Metadata</h1>
      <h2>Song List</h2>
      {songs.length === 0 ? (
        <p>No songs available.</p>
      ) : (
        <ul>
          {songs.map((song) => (
            <li key={song.name}>
              {song.name}
              <button onClick={() => handleSongSelect(song)}>Select</button>
            </li>
          ))}
        </ul>
      )}
      {selectedSong && (
        <div>
          <h3>Selected Song: {selectedSong.name}</h3>
          <p>Current Genre: {selectedSong.genre || 'None'}</p> {/* Показываем текущий жанр */}
          <h4>Select Genre</h4>
          <select value={selectedGenre} onChange={handleGenreChange}>
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <button onClick={saveGenre}>Save Genre</button>
        </div>
      )}
    </div>
  );
};

export default UpdateMetadataComponent;
