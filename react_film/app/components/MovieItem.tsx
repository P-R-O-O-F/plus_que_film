import React from 'react';

interface MovieItemProps {
  title: string;
  releaseDate: string;
}

const MovieItem: React.FC<MovieItemProps> = ({ title, releaseDate }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>{releaseDate}</p>
    </div>
  );
};

export default MovieItem;
