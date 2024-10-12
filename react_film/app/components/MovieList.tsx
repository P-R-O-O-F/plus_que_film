import React from 'react';
import MovieItem from './MovieItem';

interface MovieListProps {
  movies: Array<{ id: number; title: string; release_date: string }>;
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="mt-5">
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          title={movie.title}
          releaseDate={movie.release_date}
        />
      ))}
    </div>
  );
};

export default MovieList;
