"use client";

import { useState, useEffect, useRef } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import useMovies from './hooks/useMovies';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [initialLoad, setInitialLoad] = useState<boolean>(true); 
  const searchTriggered = useRef(false); 
  const { movies, fetchMovies, error, isLoading, hasMore, page, isSearching } = useMovies();
  const router = useRouter();

  useEffect(() => {
    if (initialLoad) {
      const savedSearchTerm = sessionStorage.getItem('searchTerm'); 
      if (savedSearchTerm) {
        setSearchTerm(savedSearchTerm); 
        fetchMovies(savedSearchTerm, 1);  
      } else {
        fetchMovies('', 1);  
      }
      setInitialLoad(false); 
    }
  }, [fetchMovies, initialLoad]);

  useEffect(() => {
    if (!initialLoad && !searchTriggered.current) {
      if (searchTerm === '' || searchTerm.length >= 3) {
        fetchMovies(searchTerm, 1); 
        sessionStorage.setItem('searchTerm', searchTerm);  
        searchTriggered.current = true; 
      }
    }
  }, [searchTerm, fetchMovies, initialLoad]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);  
    searchTriggered.current = false; 
  };
  
  const handleMovieClick = (id: number) => {
    sessionStorage.setItem('searchTerm', searchTerm); 
    router.push(`/movies/${id}`);  
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

      <MovieList movies={movies} onMovieClick={handleMovieClick} />  

      {isLoading && <p className="text-center mt-5">Chargement...</p>}  
      {!hasMore && isSearching && !isLoading && <p className="text-center mt-5">Tous les films ont été chargés.</p>}
    </div>
  );
};

export default HomePage;
