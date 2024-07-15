import React, { useState } from 'react';
import './MusicSearcher.css';

const SongSearch = ({ songs, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); 
  };

  const resetSearch = () => {
    setSearchTerm('');
    onSearch(''); 
  };

  return (
    <form className="search-bar">
      <input
        type="search"
        name="search"
        pattern=".*\S.*"
        required
        className="input"
      
        value={searchTerm}
        onChange={handleSearch}
      />
      <button
        type="button"
        className="search-btn"
        onClick={resetSearch}
      >
        <span>Сбросить</span>
      </button>
    </form>
  );
};

export default SongSearch;
