import { useState } from 'react';
export default function Favorites() {
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);

  const removeFavorite = (id) => {
    const updated = favorites.filter(f => f.imdbID !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="movie-grid">
      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Nenhum favorito salvo ainda.</p>
      ) : (
        favorites.map(movie => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <button onClick={() => removeFavorite(movie.imdbID)}>Remover</button>
          </div>
        ))
      )}
    </div>
  );
}