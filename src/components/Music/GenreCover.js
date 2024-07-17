import React from 'react';
import { useNavigate } from 'react-router-dom';

const GenreCover = ({ genre }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/genre/${genre.name}`);
  };

  return (
    <div className="genre-cover" onClick={handleClick}>
      <img src={genre.image} alt={`${genre.name} cover`} />
      <h3>{genre.name}</h3>
    </div>
  );
};

export default GenreCover;