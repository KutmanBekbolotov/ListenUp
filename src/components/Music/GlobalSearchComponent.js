import React, { Suspense, lazy, useEffect } from 'react';
import Sidebar from '../sidebar';
import GlobalSearch from './GlobalSearch';
import GenreCover from './GenreCover';
import MediaPlayer from '../MediaPlayer';
// import { useMediaPlayer } from '../../context/MediaPlayerContext';
import './GlobalSearch.css';
import { useQuery } from 'react-query';


const SongSearch = lazy(() => import('../MusicSearcher'));


const GlobalSearchComponent = () => {
    const genresQuery = useQuery('genres', () => [
      { name: 'Rock', image: 'genre-covers/rock.jpg' },
      { name: 'Pop', image: 'genre-covers/pop.jpg' },
    ]);
  
    useEffect(() => {
      if (genresQuery.data) {
        genresQuery.data.forEach((genre) => {
          if (!localStorage.getItem(genre.name)) {
            fetch(genre.image)
              .then((response) => response.blob())
              .then((blob) => {
                const objectURL = URL.createObjectURL(blob);
                localStorage.setItem(genre.name, objectURL);
              })
              .catch((error) => console.error('Ошибка при загрузке изображения:', error));
          }
        });
      }
    }, [genresQuery.data]);
  
  return (
    <div className="global-search-page">
      <Sidebar />
      <div className="content">
        <header>
          <GlobalSearch />
          <Suspense fallback={<div>Loading SongSearch...</div>}>
            <SongSearch />
          </Suspense>
        </header>
        <main>
          <div className="genres">
            {genresQuery.data && genresQuery.data.map((genre) => (
              <GenreCover key={genre.name} genre={genre} />
            ))}
          </div>
        </main>
      </div>
      <MediaPlayer />
    </div>
  );
};

export default GlobalSearchComponent;