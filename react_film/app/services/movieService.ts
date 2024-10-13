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
      include_adult: false,
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

export const searchPeople = async (searchTerm: string, page: number = 1) => {
  const response = await axios.get('https://api.themoviedb.org/3/search/person', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
    params: {
      query: searchTerm,
      language: 'fr-FR',
      page: page,
    },
  });
  return response.data.results;
};

export const fetchPeople = async (searchTerm: string, page: number = 1) => {
  const response = await axios.get('https://api.themoviedb.org/3/search/person', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
    params: {
      query: searchTerm,
      language: 'fr-FR',
      page: page,
    },
  });

  const people = response.data.results;
  const movies = people.flatMap((person: any) => person.known_for); 
  return movies;
};

export const fetchMoviesByStudio = async (studioName: string) => {
  const response = await axios.get('https://api.themoviedb.org/3/search/company', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
    params: {
      query: studioName,
      language: 'fr-FR',
    },
  });

  const studios = response.data.results;
  if (studios.length > 0) {
    const studioId = studios[0].id;
    const moviesResponse = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
      params: {
        with_companies: studioId,
        language: 'fr-FR',
      },
    });
    return moviesResponse.data.results;
  }
  return [];
};

export const getPersonMovies = async (personId: number) => {
  const response = await axios.get(`https://api.themoviedb.org/3/person/${personId}/movie_credits`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
    params: {
      language: 'fr-FR',
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

  const movies = response.data.results.slice(0, 6);
  
  return movies; 
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
      include_adult: false,
      include_video: false,
      'primary_release_date.gte': lastMonthFormatted, 
      'primary_release_date.lte': todayFormatted,     
    },
  });
  return response.data.results;
};


const similarityScore = (searchTerm: string, movieTitle: string | undefined) => {
  if (!movieTitle) return 0;

  const termWords = searchTerm.toLowerCase().split(' ');
  const titleWords = movieTitle.toLowerCase().split(' ');

  const matches = termWords.filter((word) => titleWords.includes(word));
  return matches.length / termWords.length; 
};


export const searchCombined = async (searchTerm: string, page: number = 1) => {
  try {
    const [moviesByTitle, moviesByPeople, moviesByStudio] = await Promise.all([
      searchMovies(searchTerm, page),      
      fetchPeople(searchTerm, page),      
      fetchMoviesByStudio(searchTerm)     
    ]);

    const allMovies = [...moviesByTitle, ...moviesByPeople, ...moviesByStudio];

    const uniqueMovies = Array.from(new Set(allMovies.map(movie => movie.id)))
      .map(id => allMovies.find(movie => movie.id === id))
      .filter(movie => movie?.title);  

    const sortedMovies = uniqueMovies.sort((a, b) => {
      const scoreA = similarityScore(searchTerm, a!.title);
      const scoreB = similarityScore(searchTerm, b!.title);
      return scoreB - scoreA;
    });

    return sortedMovies; 
  } catch (error) {
    console.error('Erreur lors de la recherche combinée:', error);
    throw new Error('Erreur lors de la recherche de films');
  }
};
