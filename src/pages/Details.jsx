import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../utils/api';

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{movie.Title}</h2>
      <p><strong>Diretor:</strong> {movie.Director}</p>
      <p><strong>Elenco:</strong> {movie.Actors}</p>
      <p><strong>Sinopse:</strong> {movie.Plot}</p>
      <p><strong>Avaliação:</strong> {movie.imdbRating}</p>
      <img src={movie.Poster} alt={movie.Title} />
      </div>
  );
}