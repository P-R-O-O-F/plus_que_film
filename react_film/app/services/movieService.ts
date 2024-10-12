import axios from 'axios';

// Recherche de films par titre
export const searchMovies = async (searchTerm: string) => {
  const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
    params: {
      query: searchTerm,
      language: 'fr-FR',
      region: 'FR',
    },
  });
  return response.data.results;
};

// Récupération des films les plus populaires du dernier mois
export const getPopularMovies = async () => {
  // Obtenir la date d'aujourd'hui et la date d'il y a un mois
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);

  // Formater les dates au format 'YYYY-MM-DD'
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
      include_adult: false,
      include_video: false,
      'primary_release_date.gte': lastMonthFormatted, // Date de début (il y a un mois)
      'primary_release_date.lte': todayFormatted,     // Date de fin (aujourd'hui)
    },
  });
  return response.data.results;
};
