import axios from 'axios';

export const searchMovies = async (searchTerm: string, page: number = 1) => {
  const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
    params: {
      query: searchTerm,
      language: 'fr-FR',
      region: 'FR',
      sort_by: 'popularity.desc',
      include_adult: true,
      page: page, 
    },
  });
  return response.data.results;
};


export const getMovieDetails = async (id: number) => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    params: {
      language: 'fr-FR',
      append_to_response: 'credits',
      
    },
  });
  return response.data;  
};

export const getSimilarMovies = async (movieId: number) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
    params: {
      language: 'fr-FR',
      page: 1,
    },
  });

  // Extraire les 6 premiers films et trier par ordre de pertinence (déjà trié par TMDB)
  const movies = response.data.results.slice(0, 6);
  
  return movies; // Retourner les films
};


export const getPopularMovies = async () => {
  
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);

  const todayFormatted = today.toISOString().split('T')[0];
  const lastMonthFormatted = lastMonth.toISOString().split('T')[0];

  const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
    params: {
      language: 'fr-FR',
      region: 'FR',
      sort_by: 'popularity.desc',
      include_adult: true,
      include_video: false,
      'primary_release_date.gte': lastMonthFormatted, 
      'primary_release_date.lte': todayFormatted,     
    },
  });
  return response.data.results;
};
