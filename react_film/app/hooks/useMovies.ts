import { useState } from 'react';
import { searchMovies, getPopularMovies } from '../services/movieService';

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour rechercher des films
  const fetchMovies = async (searchTerm: string) => {
    try {
      const results = await searchMovies(searchTerm);
      setMovies(results);
      setError(null);
    } catch (err) {
      setError('Erreur lors de la requête à TMDB.');
      setMovies([]);
    }
  };

  // Fonction pour récupérer les films populaires du mois
  const fetchPopularMovies = async () => {
    try {
      const results = await getPopularMovies();
      setMovies(results);
      setError(null);
    } catch (err) {
      setError('Erreur lors de la récupération des films populaires.');
      setMovies([]);
    }
  };

  return { movies, fetchMovies, fetchPopularMovies, error };
};

export default useMovies;
