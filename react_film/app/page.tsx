"use client";

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import useMovies from './hooks/useMovies';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { movies, fetchMovies, fetchPopularMovies, error } = useMovies();

  // Au chargement de la page, récupérer les films populaires du mois
  useEffect(() => {
    if (searchTerm.length < 2) {
      fetchPopularMovies();
    }
  }, [searchTerm, fetchPopularMovies]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 2) {
      fetchMovies(term);
    } else {
      fetchPopularMovies(); // Si moins de 2 caractères, afficher les films populaires
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold mb-4">Rechercher un film</h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      {error && <p className="text-red-500">{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
