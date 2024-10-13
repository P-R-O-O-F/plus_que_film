import React from 'react';

interface MovieItemProps {
  id: number;
  title: string;
  posterUrl: string;
  releaseDate: string;
  overview: string;
  voteAverage: number;
  onClick: (id: number) => void;
}

const MovieItem: React.FC<MovieItemProps> = ({ id, title, posterUrl, releaseDate, overview, voteAverage, onClick }) => {
  const voteAveragePercentage = Math.round(voteAverage * 10);  

  return (
    <div
      onClick={() => onClick(id)}
      className="cursor-pointer relative flex flex-col bg-transparent hover:bg-gray-800 transition duration-300 p-4 text-white mb-5 group transform hover:scale-105 transition-transform duration-300 ease-out"
    >
      <div className="relative">
        <img src={posterUrl} alt={title} className="w-full object-cover rounded-lg" />

        <div className="absolute bottom-[-15px] right-[-15px] w-16 h-16">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center relative">
              <span className="text-white font-bold">{voteAveragePercentage}%</span>
              <svg className="absolute top-0 left-0 w-16 h-16">
                <circle
                  className="text-gray-600"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="24"
                  cx="32"
                  cy="32"
                />
                <circle
                  className="text-green-500"
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="24"
                  cx="32"
                  cy="32"
                  strokeDasharray="151"
                  strokeDashoffset={`calc(151 - (151 * ${voteAveragePercentage}) / 100)`}
                  transform="rotate(-90 32 32)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold mt-2 line-clamp-2">{title}</h2>
      <p className="text-gray-400 text-sm">{releaseDate}</p>
      <p className="text-gray-300 text-sm mt-2 line-clamp-2 transition-all duration-300">
        {overview || "Aucune description disponible."}
      </p>
    </div>
  );
};

export default MovieItem;
