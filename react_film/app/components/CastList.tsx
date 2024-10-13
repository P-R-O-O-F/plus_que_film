"use client";

import React, { useRef } from "react";

interface CastListProps {
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }>;
}

const CastList: React.FC<CastListProps> = ({ cast }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 155;
      if (direction === "left") {
        carouselRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const startAutoScroll = (direction: "left" | "right") => {
    const scrollAmount = 3;
    autoScrollRef.current = setInterval(() => {
      if (direction === "left") {
        carouselRef.current!.scrollLeft -= scrollAmount;
      } else if (direction === "right") {
        carouselRef.current!.scrollLeft += scrollAmount;
      }
    }, 10);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Casting</h2>

      <div className="relative hidden md:block">
        <button
          onClick={() => scrollCarousel("left")}
          onMouseEnter={() => startAutoScroll("left")}
          onMouseLeave={stopAutoScroll}
          className="absolute left-0 top-0 bottom-0 z-10 bg-black bg-opacity-50 text-white p-2"
        >
          ←
        </button>

        <div
          ref={carouselRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {cast.map((actor) => (
            <div key={actor.id} className="w-24 flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-auto rounded-lg mb-2"
              />
              <p className="text-white font-bold text-xs">{actor.name}</p>
              <p className="text-gray-400 text-xs">{actor.character}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollCarousel("right")}
          onMouseEnter={() => startAutoScroll("right")}
          onMouseLeave={stopAutoScroll}
          className="absolute right-0 top-0 bottom-0 z-10 bg-black bg-opacity-50 text-white p-2"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:hidden">
        {cast.map((actor) => (
          <div key={actor.id} className="text-center">
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-auto rounded-lg mb-2"
              />
            ) : (
              <div className="w-full h-48 bg-gray-800 rounded-lg mb-2"></div>
            )}
            <p className="text-white font-bold text-xs">{actor.name}</p>
            <p className="text-gray-400 text-xs">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastList;
