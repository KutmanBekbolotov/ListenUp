import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GlobalSearch.css';

const GenreCover = ({ genre }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/genre/${genre.name}`);
  };

  return (
    <div className="genre-cover" onClick={handleClick}>
      <img src={genre.image} alt={`${genre.name} cover`} />
      <h2>{genre.name}</h2>
    </div>
  );
};

export default GenreCover;