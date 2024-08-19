import React from 'react';
import { useQuery } from 'react-query';
import Sidebar from '../sidebar';
import GenreCover from './GenreCover';
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
import travelImage from '../../assets/travel.jpg';
import gamingImage from '../../assets/gaming.jpg';
import animeImage from '../../assets/anime.jpg';
import soulImage from '../../assets/soul.jpeg';
import topchartImage from '../../assets/topchart.jpg';
import workoutImage from '../../assets/workout.jpg';
import rapImage from '../../assets/rap.jpg';

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
