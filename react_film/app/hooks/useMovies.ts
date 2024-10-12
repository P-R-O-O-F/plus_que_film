import { useState } from 'react';
import { searchMovies, getPopularMovies } from '../services/movieService';

const useMovies = () => {
  const [movies, setMovies] = useState<any[]>([]);  
  const [page, setPage] = useState(1);       
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);  
  const [hasMore, setHasMore] = useState(true);  
  const [isSearching, setIsSearching] = useState(false);  

 
  const fetchMovies = async (searchTerm: string, newPage = 1) => {
    if (isLoading) return;  
    setIsLoading(true);  
    
    try {
      let results: any[] = [];  

      if (searchTerm && searchTerm.length > 2) {
        setIsSearching(true); 
        if (newPage === 1) setMovies([]);
        results = await searchMovies(searchTerm, newPage); 
        setMovies(prevMovies => [...prevMovies, ...(results || [])]); 
        setPage(newPage);  
        setHasMore(results.length > 0); 
      } else {
        setIsSearching(false); 
        results = await getPopularMovies(); 
        setMovies(results || []);  
        setHasMore(false);  
      }

      setError(null);
    } catch (err) {
      setError('Erreur lors de la requête à TMDB.');
    } finally {
      setIsLoading(false); 
    }
  };

  return { movies, fetchMovies, error, isLoading, hasMore, page, isSearching };
};

export default useMovies;
