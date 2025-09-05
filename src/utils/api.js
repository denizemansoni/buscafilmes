const API_KEY = 'ab1abf6c'; // Pegue em http://www.omdbapi.com/apikey.aspx
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (query, page = 1) => {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`);
  return res.json();
};

export const fetchMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
  return res.json();
};