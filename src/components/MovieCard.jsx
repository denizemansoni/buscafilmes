export default function MovieCard({ movie, onDetails, onToggleFavorite, isFavorite }) {
  return (
    <div>
      <img src={movie.Poster} alt={movie.Title} width="100" />
      <h3>{movie.Title} ({movie.Year})</h3>
      <button onClick={() => onDetails(movie.imdbID)}>Ver Detalhes</button>
      <button onClick={() => onToggleFavorite(movie)}>
        {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
      </button>
    </div>
  );
}