import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';

const GenreSongs = () => {
  const { genreName } = useParams();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const songsCollection = await db.collection('songs').where('genre', '==', genreName).get();
      setSongs(songsCollection.docs.map(doc => doc.data()));
    };

    fetchSongs();
  }, [genreName]);

  return (
    <div>
      <h2>{genreName} Songs</h2>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>{song.title} by {song.artist}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenreSongs;