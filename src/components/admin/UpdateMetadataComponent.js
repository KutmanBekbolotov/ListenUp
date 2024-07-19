import React, { useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseConfig } from '../../firebase'; 
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const UpdateMetadataComponent = () => {
  const [genre, setGenre] = useState(''); // Для хранения выбранного жанра
  const [genres, setGenres] = useState(['Rock', 'Pop', 'Electronic', 'Hip-Hop', 'Country']); // Примерные жанры

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const updateMetadata = async () => {
    const getAllSongs = async () => {
      const songsRef = ref(storage, 'music/');
      const allSongs = await listAll(songsRef);

      const songPromises = allSongs.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          name: itemRef.name,
          url: url
        };
      });

      const songs = await Promise.all(songPromises);
      return songs;
    };

    const addSongsToFirestore = async (songs) => {
      const songPromises = songs.map(async (song) => {
        const songData = {
          title: song.name.split('.').slice(0, -1).join('.'),
          artist: 'Unknown Artist',
          genre: genre || 'Unknown Genre',
          url: song.url
        };

        const docRef = await addDoc(collection(db, 'songs'), songData);
        console.log("Document written with ID: ", docRef.id);
      });

      await Promise.all(songPromises);
    };

    getAllSongs().then(addSongsToFirestore).catch(console.error);
  };

  return (
    <div>
      <select value={genre} onChange={handleGenreChange}>
        <option value="">Select Genre</option>
        {genres.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      <button onClick={updateMetadata}>Update Song Metadata</button>
    </div>
  );
};

export default UpdateMetadataComponent;
