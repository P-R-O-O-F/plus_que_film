"use client"; 

import { createContext, useContext, useState, ReactNode } from 'react';

interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  releaseDate: string;
  overview: string;
  voteAverage: number;
}

interface MovieContextProps {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie) => void;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <MovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
