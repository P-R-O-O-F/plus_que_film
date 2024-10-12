"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMovieContext } from './MovieContext';

interface MovieItemProps {
  id: number;
  title: string;
  posterUrl: string;
  releaseDate: string;
  overview: string;
  voteAverage: number;
}

const MovieItem: React.FC<MovieItemProps> = ({ id, title, posterUrl, releaseDate, overview, voteAverage }) => {
  const router = useRouter();
  const { setSelectedMovie } = useMovieContext();

  const handleClick = () => {
    setSelectedMovie({ id, title, posterUrl, releaseDate, overview, voteAverage });
    router.push(`/movies/${id}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer relative flex flex-col bg-transparent hover:bg-gray-800 transition duration-300 p-4 text-white mb-5 group">
      <img src={posterUrl} alt={title} className="w-full object-cover rounded-lg" />
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-400 text-sm">{releaseDate}</p>
      <p className="text-gray-300 text-sm mt-2 line-clamp-2 transition-all duration-300">{overview || "Aucune description disponible."}</p>
    </div>
  );
};

export default MovieItem;
