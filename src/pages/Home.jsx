import { useState, useEffect } from 'react';
import { fetchMovies } from '../utils/api';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetchMovies(query, page)
      .then(data => {
        if (data.Response === 'True') {
          setMovies(data.Search);
          setError('');
        } else {
          setError(data.Error);
          setMovies([]);
        }
      })
      .finally(() => setLoading(false));
  }, [query, page]);

  const toggleFavorite = (movie) => {
    const exists = favorites.find(f => f.imdbID === movie.imdbID);
    const updated = exists
      ? favorites.filter(f => f.imdbID !== movie.imdbID)
      : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div>
      <SearchBar onSearch={setQuery} />
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {movies.map(movie => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onDetails={(id) => window.location.href = `/details/${id}`}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.some(f => f.imdbID === movie.imdbID)}
        />
      ))}
      <Pagination currentPage={page} onPageChange={setPage} />
      <div className="movie-grid">
  {movies.map(movie => (
    <MovieCard
      key={movie.imdbID}
      movie={movie}
      onDetails={(id) => window.location.href = `/details/${id}`}
      onToggleFavorite={toggleFavorite}
      isFavorite={favorites.some(f => f.imdbID === movie.imdbID)}
    />
  ))}
</div>
    </div>
  );
}