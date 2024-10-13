'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getSimilarMovies } from '../services/movieService';
import { useRouter } from 'next/navigation';
import MovieItem from './MovieItem'; 

interface SuggestionPanelProps {
  movieId: number;
  isOpen: boolean;
  onClose: () => void;
}

const SuggestionPanel: React.FC<SuggestionPanelProps> = ({ movieId, isOpen, onClose }) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const router = useRouter(); 

  useEffect(() => {
    if (isOpen) {
      const fetchSuggestions = async () => {
        const data = await getSimilarMovies(movieId);
        setSuggestions(data.slice(0, 6));
      };
      fetchSuggestions();
    }
  }, [movieId, isOpen]);

  const handleMovieClick = (id: number) => {
    onClose(); 
    router.push(`/movies/${id}`); 
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md bg-[#121212]">
              <div className="flex h-full flex-col overflow-y-scroll py-6 shadow-xl">
                <div className="px-4 sm:px-6 flex justify-between">
                  <DialogTitle className="text-lg font-medium text-gray-100">Suggestions de films similaires</DialogTitle>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {suggestions.length > 0 ? (
                    <>
                      <div className="block sm:hidden">
                        <ul>
                          {suggestions.map((movie) => (
                            <li
                              key={movie.id}
                              className="mb-2 text-blue-500 hover:underline cursor-pointer"
                              onClick={() => handleMovieClick(movie.id)}
                            >
                              {movie.title}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="hidden sm:grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {suggestions.map((movie) => (
                          <MovieItem
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            posterUrl={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            releaseDate={movie.release_date}
                            overview={movie.overview}
                            voteAverage={movie.vote_average}
                            onClick={handleMovieClick} 
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-300">Aucune suggestion disponible.</p>
                  )}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SuggestionPanel;
