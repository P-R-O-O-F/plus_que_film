"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMovieDetails } from "../../services/movieService";
import { FaHourglassHalf } from "react-icons/fa";
import CastList from '../../components/CastList'; 

const MovieDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const searchTerm = localStorage.getItem("searchTerm"); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(Number(id));
        setMovieDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du film :", error);
        router.push("/");
      }
    };

    fetchMovieDetails();
  }, [id, router]);

  if (loading) {
    return <p>Chargement des détails du film...</p>;
  }

  if (!movieDetails) {
    return <p>Aucun détail disponible pour ce film.</p>;
  }

  const voteAveragePercentage = Math.round(movieDetails.vote_average * 10);
  const creator = movieDetails.credits?.crew?.find(
    (member: any) => member.job === "Director" || member.job === "Writer" || member.job === "Creator"
  )?.name;

  const backdropUrl = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;

  return (
    <div
      className="min-h-screen bg-[#121212] text-white p-5 relative"
      style={{
        backgroundImage: `url(${backdropUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 1,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="mb-10 z-10 relative">
          <button
            className="text-blue-500"
            onClick={() => {
              router.push(`/?searchTerm=${searchTerm}`);
            }}
          >
            ← Retour à la recherche
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 w-full relative z-10">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="w-full object-cover rounded-lg"
            />
          </div>

          <div className="flex-1 text-left space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {movieDetails.title}{" "}
              <span className="font-normal text-gray-400">
                ({new Date(movieDetails.release_date).getFullYear()})
              </span>
            </h1>

            <div className="flex items-center gap-2">
              {movieDetails.production_companies.length > 0 && (
                <div className="bg-gray-800 text-gray-300 py-1 px-3 rounded-full">
                  {movieDetails.production_companies[0].name}
                </div>
              )}
              <div className="text-lg text-gray-300">
                {movieDetails.genres.map((genre: any) => genre.name).join(", ")}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <div className="relative w-16 h-16">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center relative">
                  <span className="text-white font-bold text-xl">{voteAveragePercentage}%</span>
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

              <span className="text-lg text-gray-300">Score d'évaluation</span>

              <div className="flex items-center gap-2 ml-8">
                <FaHourglassHalf className="text-grey-100" />
                <span className="text-lg text-gray-300">
                  {movieDetails.runtime} min
                </span>
              </div>
            </div>

            <div className="text-lg text-gray-300">
              <h2 className="text-2xl font-bold mb-2">Synopsis</h2>
              <p>{movieDetails.overview}</p>
            </div>

            {creator && (
              <div className="text-lg text-gray-300 mt-4">
                <h2 className="text-2xl font-bold mb-2">Créateur/Créatrice</h2>
                <p>{creator}</p>
              </div>
            )}
          </div>
        </div>

        <CastList cast={movieDetails.credits.cast} />
      </div>
    </div>
  );
};

export default MovieDetail;
