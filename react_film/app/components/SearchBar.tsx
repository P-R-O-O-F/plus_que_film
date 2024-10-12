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
      className="border p-2 w-full mb-8 text-gray-900 bg-gray-100"
      placeholder="Tapez le titre d'un film..."
    />
  );
};

export default SearchBar;
