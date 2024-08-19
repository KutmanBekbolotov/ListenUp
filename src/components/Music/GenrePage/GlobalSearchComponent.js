import React from 'react';
import { useQuery } from 'react-query';
import Sidebar from '../../SubComponents/Sidebar/sidebar';
import GenreCover from './GenreCover';
import './GlobalSearch.css';
import rockImage from '../../../assets/GenreCovers/rock.jpg'; 
import popImage from '../../../assets/GenreCovers/pop.jpg'; 
import electronicImage from '../../../assets/GenreCovers/electronic.jpg';
import hiphopImage from '../../../assets/GenreCovers/hiphop.jpg';
import countryImage from '../../../assets/GenreCovers/country.jpg';
import partyImage from '../../../assets/GenreCovers/party.jpeg';
import kpopImage from '../../../assets/GenreCovers/kpop.jpeg';
import sleepImage from '../../../assets/GenreCovers/sleep.jpg';
import loveImage from '../../../assets/GenreCovers/love.jpg';
import jazzImage from '../../../assets/GenreCovers/jazz.png';
import classicalImage from '../../../assets/GenreCovers/classical.jpeg';
import kidsImage from '../../../assets/GenreCovers/kids.jpg';
import travelImage from '../../../assets/GenreCovers/travel.jpg';
import gamingImage from '../../../assets/GenreCovers/gaming.jpg';
import animeImage from '../../../assets/GenreCovers/anime.jpg';
import soulImage from '../../../assets/GenreCovers/soul.jpeg';
import topchartImage from '../../../assets/GenreCovers/topchart.jpg';
import workoutImage from '../../../assets/GenreCovers/workout.jpg';
import rapImage from '../../../assets/GenreCovers/rap.jpg';

const GlobalSearchComponent = () => {
  const genresQuery = useQuery('genres', () => [
    { name: 'Rock', image: rockImage },
    { name: 'Pop', image: popImage },
    { name: 'Electronic', image: electronicImage },
    { name: 'Hip-Hop', image: hiphopImage },
    { name: 'Rap', image: rapImage },
    { name: 'Country', image: countryImage },
    { name: 'Party-music', image: partyImage },
    { name: 'K-pop', image: kpopImage },
    { name: 'Sleep', image: sleepImage },
    { name: 'Love', image: loveImage },
    { name: 'Jazz', image: jazzImage },
    { name: 'Classical', image: classicalImage },
    { name: 'Kids&Family', image: kidsImage },
    { name: 'Travel', image: travelImage },
    { name: 'Gaming', image: gamingImage },
    { name: 'Anime', image: animeImage },
    { name: 'Soul', image: soulImage },
    { name: 'Top-Chart', image: topchartImage },
    { name: 'Training', image: workoutImage },
  ]);

  return (
    <div className="global-search-page">
      <Sidebar />
      <div className="content">
        <header>
          <h1>Albums</h1>
        </header>
        <main className="genres-container">
          {genresQuery.data && genresQuery.data.reduce((rows, genre, index) => {
            if (index % 4 === 0) rows.push([]);
            rows[rows.length - 1].push(genre);
            return rows;
          }, []).map((row, rowIndex) => (
            <div className="genres-row" key={rowIndex}>
              {row.map((genre) => (
                <GenreCover key={genre.name} genre={genre} />
              ))}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default GlobalSearchComponent;
