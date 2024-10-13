import React, { useState, useEffect, useCallback } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  const [inputValue, setInputValue] = useState(searchTerm); // Synchroniser avec le searchTerm

  const debouncedSearch = useCallback(
    (value: string) => {
      const timer = setTimeout(() => {
        if (value.length >= 3 || value === '') {
          onSearch(value);  
        }
      }, 600);

      return () => clearTimeout(timer);
    },
    [onSearch]
  );

  // Mettre à jour l'inputValue lorsque searchTerm change (utile après un retour à la page)
  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    return debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="border p-2 w-full mb-8 text-gray-900 bg-gray-100"
      placeholder="Tapez le titre d'un film..."
    />
  );
};

export default SearchBar;
