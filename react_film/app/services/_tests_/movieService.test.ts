import axios from 'axios';
import { searchMovies, getMovieDetails, getPopularMovies } from '../movieService';

// Mock d'axios avec jest
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('movieService', () => {
  describe('searchMovies', () => {
    it('devrait renvoyer une liste de films en fonction du terme de recherche', async () => {
      const movies = [{ id: 1, title: 'Film de Test' }];
      mockedAxios.get.mockResolvedValue({ data: { results: movies } });

      const result = await searchMovies('Test', 1);
      expect(result).toEqual(movies);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/search/movie',
        expect.objectContaining({
          params: expect.objectContaining({
            query: 'Test',
            language: 'fr-FR',
            page: 1,
          }),
        })
      );
    });
  });

  describe('getMovieDetails', () => {
    it('devrait renvoyer les détails du film en fonction de son ID', async () => {
      const movieDetails = { id: 1, title: 'Film Détail' };
      mockedAxios.get.mockResolvedValue({ data: movieDetails });

      const result = await getMovieDetails(1);
      expect(result).toEqual(movieDetails);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/movie/1',
        expect.objectContaining({
          params: expect.objectContaining({
            language: 'fr-FR',
            append_to_response: 'credits',
          }),
        })
      );
    });
  });

  describe('getPopularMovies', () => {
    it('devrait renvoyer une liste de films populaires du dernier mois', async () => {
      const popularMovies = [{ id: 1, title: 'Film Populaire' }];
      mockedAxios.get.mockResolvedValue({ data: { results: popularMovies } });

      const result = await getPopularMovies();
      expect(result).toEqual(popularMovies);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/discover/movie',
        expect.anything()
      );
    });
  });
});
