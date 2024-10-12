"use client";

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import useMovies from './hooks/useMovies';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { movies, fetchMovies, error, isLoading, hasMore, page, isSearching } = useMovies();

  useEffect(() => {
    fetchMovies('', 1);  
  }, []);

 
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    fetchMovies(term, 1); 
  };

  useEffect(() => {
    if (!isSearching) return;  

    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
        if (hasMore && !isLoading) {
          fetchMovies(searchTerm, page + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);  
  }, [searchTerm, page, hasMore, isLoading, fetchMovies, isSearching]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold mb-4">Rechercher un film</h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

      {error && <p className="text-red-500">{error}</p>}

      <MovieList movies={movies} />

      {isLoading && <p className="text-center mt-5">Chargement...</p>}
      {!hasMore && isSearching && !isLoading && <p className="text-center mt-5">Tous les films ont été chargés.</p>}
    </div>
  );
};

export default HomePage;
