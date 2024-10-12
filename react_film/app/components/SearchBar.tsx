import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      className="border p-2 w-full"
      placeholder="Tapez le titre d'un film..."
    />
  );
};

export default SearchBar;
