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
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem('favorites')) || []
  );

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
      : [movie, ...favorites];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="container">
      <SearchBar onSearch={setQuery} />

      {loading && <p style={{ textAlign: 'center' }}>Carregando...</p>}
      {error && <p style={{ textAlign: 'center', color: 'tomato' }}>{error}</p>}

      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onDetails={id => window.location.href = `/details/${id}`}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.some(f => f.imdbID === movie.imdbID)}
          />
        ))}
      </div>

      {movies.length > 0 && (
        <Pagination
          currentPage={page}
          onPageChange={newPage => setPage(newPage)}
        />
      )}
    </div>
  );
}