import React, { useEffect, Suspense, lazy } from 'react';
import { useQuery } from 'react-query';
import Sidebar from '../sidebar';
import GenreCover from './GenreCover';
import './GlobalSearch.css';
import GlobalSearch from './GlobalSearch';


const SongSearch = lazy(() => import('../MusicSearcher'));
const MediaPlayer = lazy(() => import('../MediaPlayer'));

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
            <Suspense fallback={<div>Loading MediaPlayer...</div>}>
                <MediaPlayer />
            </Suspense>
        </div>
    );
};

export default GlobalSearchComponent;
