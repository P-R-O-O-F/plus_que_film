import React, { useState, useEffect, useCallback } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string, type: string) => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  const [inputValue, setInputValue] = useState(searchTerm); 
  const [searchType, setSearchType] = useState('movie'); 

  const debouncedSearch = useCallback(
    (value: string) => {
      const timer = setTimeout(() => {
        if (value.length >= 3 || value === '') {
          onSearch(value, searchType);  
        }
      }, 600);

      return () => clearTimeout(timer);
    },
    [onSearch, searchType] 
  );

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    return debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  return (
    <div className="mb-8">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border p-2 w-full text-gray-900 bg-gray-100"
        placeholder={`Rechercher par ${searchType === 'movie' ? 'titre de film' : searchType === 'person' ? 'acteur/réalisateur' : 'studio de production'}...`}
      />
    </div>
  );
};

export default SearchBar;
