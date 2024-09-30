import React from 'react';

const Search = ({ handleSearchNote, handleSearchTag }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search notes..."
        onChange={(e) => handleSearchNote(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search tags..."
        onChange={(e) => handleSearchTag(e.target.value)}
      />
    </div>
  );
};

export default Search;
