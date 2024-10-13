"use client";

import { useState, useEffect, useRef } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import { searchCombined, getPopularMovies } from './services/movieService';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [movies, setMovies] = useState<any[]>([]);  
  const [initialLoad, setInitialLoad] = useState<boolean>(true); 
  const [page, setPage] = useState<number>(1);  
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);  
  const [error, setError] = useState<string | null>(null); 

  const searchTriggered = useRef(false); 
  const router = useRouter();

  useEffect(() => {
    if (initialLoad) {
      const savedSearchTerm = sessionStorage.getItem('searchTerm');
      if (savedSearchTerm) {
        setSearchTerm(savedSearchTerm);
        searchCombined(savedSearchTerm, 1)
          .then(fetchedMovies => {
            setMovies(fetchedMovies);
            setHasMore(fetchedMovies.length >= 16); 
          })
          .catch(() => setError('Erreur lors du chargement des films'));  
      } else {
        getPopularMovies()
          .then(fetchedMovies => {
            setMovies(fetchedMovies);
            setHasMore(fetchedMovies.length >= 16);  
          })
          .catch(() => setError('Erreur lors du chargement des films populaires'));  
      }
      setInitialLoad(false);
    }
  }, [initialLoad]);

  useEffect(() => {
    if (!initialLoad && !searchTriggered.current) {
      setPage(1);  
      if (searchTerm === '') {
        
        getPopularMovies()
          .then(fetchedMovies => {
            setMovies(fetchedMovies);
            setHasMore(fetchedMovies.length >= 16);
          })
          .catch(() => setError('Erreur lors du chargement des films populaires'));  
      } else if (searchTerm.length >= 3) {
        searchCombined(searchTerm, 1)
          .then(fetchedMovies => {
            setMovies(fetchedMovies);
            setHasMore(fetchedMovies.length >= 16);
          })
          .catch(() => setError('Erreur lors de la recherche de films'));
        sessionStorage.setItem('searchTerm', searchTerm);
      }
      searchTriggered.current = true;
    }
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    searchTriggered.current = false; 
  };


  const handleMovieClick = (id: number) => {
    sessionStorage.setItem('searchTerm', searchTerm); 
    router.push(`/movies/${id}`);
  };


  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
        if (hasMore && !isLoading) {
          setIsLoading(true);
          const nextPage = page + 1;
          setPage(nextPage); 
          searchCombined(searchTerm, nextPage)
            .then(fetchedMovies => {
              setMovies(prevMovies => [...prevMovies, ...fetchedMovies]); 
              setHasMore(fetchedMovies.length >= 16);  
            })
            .catch(() => setError('Erreur lors du chargement des films supplémentaires'))  
            .finally(() => setIsLoading(false));  
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchTerm, page, hasMore, isLoading]);

  return (
    <div
      className="container mx-auto p-5 min-h-screen"
      style={{      }}
    >
      <h1 className="text-4xl font-bold mb-4 text-white">Rechercher un film</h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

      {error && <p className="text-red-500">{error}</p>}

      <MovieList movies={movies} onMovieClick={handleMovieClick} />

      {isLoading && <p className="text-center mt-5 text-white">Chargement...</p>}
      {!hasMore && !isLoading && <p className="text-center mt-5 text-white">Tous les films ont été chargés.</p>}
    </div>
  );
};

export default HomePage;
