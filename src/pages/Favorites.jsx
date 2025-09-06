// Favorites.jsx
import { useState } from 'react';
import Pagination from '../components/Pagination';

export default function Favorites() {
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  // se quiser paginação nos favoritos:
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;
  const totalPages = Math.ceil(favorites.length / perPage);
  const start = (currentPage - 1) * perPage;
  const currentFavorites = favorites.slice(start, start + perPage);

  const removeFavorite = (id) => {
    const updated = favorites.filter(f => f.imdbID !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
    // ajuste a página se remover tudo da última
    if (currentFavorites.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Nenhum favorito salvo ainda.</p>
      ) : (
        <>
          <div className="movie-grid">
            {currentFavorites.map(movie => (
              <div key={movie.imdbID} className="movie-card">
                <img src={movie.Poster} alt={movie.Title} />
                <h3>{movie.Title}</h3>
                <button onClick={() => removeFavorite(movie.imdbID)}>
                  Remover
                </button>
              </div>
            ))}
          </div>
          {/* só mostra paginação se mais de uma página existir */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              onPageChange={(p) => {
                if (p >= 1 && p <= totalPages) setCurrentPage(p);
              }}
              totalPages={totalPages}  /* opcional, veja abaixo */
            />
          )}
        </>
      )}
    </div>
  );
}