import axios from 'axios';

// Recherche de films par titre
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


// Fonction pour récupérer les détails complets d'un film via son ID
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

export const searchMovieSuggestions = async (searchTerm: string) => {
  const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
    params: {
      query: searchTerm,
      language: 'fr-FR',
      region: 'FR',
      sort_by: 'popularity.desc',  // Trier par popularité
      include_adult: false,  // Exclure les films pour adultes
      page: 1,  // Limiter à la première page
    },
  });

  // Limiter les suggestions à un maximum de 5 films populaires
  return response.data.results.slice(0, 5);
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
