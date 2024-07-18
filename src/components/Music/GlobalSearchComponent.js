import React, { useEffect, Suspense, lazy } from 'react';
import { useQuery } from 'react-query';
import Sidebar from '../sidebar';
import GenreCover from './GenreCover';
import MediaPlayer from '../MediaPlayer';
import './GlobalSearch.css';
import rockImage from '../../assets/rock.jpg'; 
import popImage from '../../assets/pop.jpg'; 
import electronicImage from '../../assets/electronic.jpg';
import hiphopImage from '../../assets/hiphop.jpg';
import countryImage from '../../assets/country.jpg';
import partyImage from '../../assets/party.jpeg';
import kpopImage from '../../assets/kpop.jpeg';
import sleepImage from '../../assets/sleep.jpg';
import loveImage from '../../assets/love.jpg';
import jazzImage from '../../assets/jazz.png';
import classicalImage from '../../assets/classical.jpeg';
import kidsImage from '../../assets/kids.jpg';

const SongSearch = lazy(() => import('../MusicSearcher'));

const GlobalSearchComponent = () => {
  const genresQuery = useQuery('genres', () => [
    { name: 'Rock', image: rockImage },
    { name: 'Pop', image: popImage },
    {name: 'Electronic', image: electronicImage},
    {name: 'Hip-Hop', image: hiphopImage},
    {name: 'Country', image: countryImage},
    {name: 'Party-music', image: partyImage},
    {name: 'K-pop', image: kpopImage},
    {name: 'Music for sleep', image: sleepImage},
    {name: 'Love', image: loveImage},
    {name: 'Jazz', image: jazzImage},
    {name: 'Clsaccical', image: classicalImage},
    {name: 'Kids&Family', image: kidsImage},
  ]);

  useEffect(() => {
  }, []);

  return (
    <div className="global-search-page">
      <Sidebar />
      <div className="content">
      <header>
          <h1>Global Search Page</h1>
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
