import React from 'react';
import MovieItem from './MovieItem';

interface MovieListProps {
  movies: Array<{
    id: number;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
    vote_average: number;
  }>;
  onMovieClick: (id: number) => void;  
}

const MovieList: React.FC<MovieListProps> = ({ movies, onMovieClick }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.release_date}
          overview={movie.overview}
          posterUrl={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          voteAverage={movie.vote_average}
          onClick={onMovieClick}  
        />
      ))}
    </div>
  );
};

export default MovieList;
