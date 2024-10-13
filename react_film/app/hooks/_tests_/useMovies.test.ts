import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import useMovies from '../useMovies';
import { searchMovies, getPopularMovies } from '../../services/movieService';

jest.mock('../../services/movieService');
const mockedSearchMovies = searchMovies as jest.Mock;
const mockedGetPopularMovies = getPopularMovies as jest.Mock;

describe('useMovies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait initialiser avec les valeurs par défaut', () => {
    const { result } = renderHook(() => useMovies());

    expect(result.current.movies).toEqual([]);
    expect(result.current.page).toBe(1);
    expect(result.current.error).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.isSearching).toBe(false);
  });

  it('devrait récupérer les films populaires au premier rendu', async () => {
    const popularMovies = [{ id: 1, title: 'Film Populaire' }];
    mockedGetPopularMovies.mockResolvedValueOnce(popularMovies);

    const { result } = renderHook(() => useMovies());

    act(() => {
      result.current.fetchMovies('', 1);
    });

    await waitFor(() => {
      expect(result.current.movies).toEqual(popularMovies);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSearching).toBe(false);
      expect(result.current.hasMore).toBe(false);
    });
  });

  it('devrait rechercher des films en fonction d\'un terme', async () => {
    const searchResults = [{ id: 2, title: 'Film de Test' }];
    mockedSearchMovies.mockResolvedValueOnce(searchResults);

    const { result } = renderHook(() => useMovies());

    act(() => {
      result.current.fetchMovies('Test', 1);
    });

    await waitFor(() => {
      expect(result.current.movies).toEqual(searchResults);
      expect(result.current.isSearching).toBe(true);
      expect(result.current.hasMore).toBe(true);
    });
  });

  it('devrait gérer les erreurs lors de la requête', async () => {
    mockedSearchMovies.mockRejectedValueOnce(new Error('Erreur de requête'));

    const { result } = renderHook(() => useMovies());

    act(() => {
      result.current.fetchMovies('Erreur', 1);
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Erreur lors de la requête à TMDB.');
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('devrait paginer correctement les résultats lors d\'une recherche', async () => {
    const firstPageResults = [{ id: 1, title: 'Film Page 1' }];
    const secondPageResults = [{ id: 2, title: 'Film Page 2' }];

    mockedSearchMovies
      .mockResolvedValueOnce(firstPageResults)
      .mockResolvedValueOnce(secondPageResults);

    const { result } = renderHook(() => useMovies());

    act(() => {
      result.current.fetchMovies('Test', 1);
    });

    await waitFor(() => {
      expect(result.current.movies).toEqual(firstPageResults);
      expect(result.current.page).toBe(1);
    });

    act(() => {
      result.current.fetchMovies('Test', 2);
    });

    await waitFor(() => {
      expect(result.current.movies).toEqual([...firstPageResults, ...secondPageResults]);
      expect(result.current.page).toBe(2);
    });
  });
});
