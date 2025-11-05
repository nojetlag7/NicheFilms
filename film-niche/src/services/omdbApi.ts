import { OMDBMovie, OMDBSearchResponse, Movie } from '../types/types';

//omdb api base url and key
const OMDB_BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

//check if api key exists
if (!API_KEY) {
  console.warn('omdb api key not found. add REACT_APP_OMDB_API_KEY to your .env file');
}

//transform omdb response to our movie type
export const transformOMDBToMovie = (omdbMovie: OMDBMovie): Movie => {
  return {
    id: omdbMovie.imdbID,
    title: omdbMovie.Title,
    year: parseInt(omdbMovie.Year) || 0,
    poster: omdbMovie.Poster !== 'N/A' ? omdbMovie.Poster : '/placeholder-poster.jpg',
    rating: parseFloat(omdbMovie.imdbRating) || 0,
    genre: omdbMovie.Genre,
    plot: omdbMovie.Plot,
    director: omdbMovie.Director,
    actors: omdbMovie.Actors,
    runtime: omdbMovie.Runtime,
    released: omdbMovie.Released
  };
};

//search movies by title
export const searchMoviesByTitle = async (query: string): Promise<Movie[]> => {
  if (!API_KEY) {
    throw new Error('api key not configured');
  }

  try {
    const response = await fetch(
      `${OMDB_BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
    );
    
    const data: OMDBSearchResponse = await response.json();
    
    if (data.Response === 'False') {
      return [];
    }

    //fetch full details for each search result
    const moviePromises = data.Search.slice(0, 20).map(result => 
      getMovieById(result.imdbID)
    );
    
    const movies = await Promise.all(moviePromises);
    return movies.filter((movie): movie is Movie => movie !== null);
  } catch (error) {
    console.error('error searching movies:', error);
    throw error;
  }
};

//get single movie by imdb id
export const getMovieById = async (id: string): Promise<Movie | null> => {
  if (!API_KEY) {
    throw new Error('api key not configured');
  }

  try {
    const response = await fetch(
      `${OMDB_BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
    );
    
    const data: OMDBMovie = await response.json();
    
    if (data.Response === 'False') {
      return null;
    }

    return transformOMDBToMovie(data);
  } catch (error) {
    console.error('error fetching movie:', error);
    throw error;
  }
};

//get movie by exact title
export const getMovieByTitle = async (title: string): Promise<Movie | null> => {
  if (!API_KEY) {
    throw new Error('api key not configured');
  }

  try {
    const response = await fetch(
      `${OMDB_BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}&plot=full`
    );
    
    const data: OMDBMovie = await response.json();
    
    if (data.Response === 'False') {
      return null;
    }

    return transformOMDBToMovie(data);
  } catch (error) {
    console.error('error fetching movie:', error);
    throw error;
  }
};

//get popular movies (using predefined list since omdb doesn't have trending)
export const getPopularMovies = async (): Promise<Movie[]> => {
  //list of popular movie ids to fetch
  const popularIds = [
    'tt0111161', //shawshank redemption
    'tt0068646', //godfather
    'tt0468569', //dark knight
    'tt0071562', //godfather 2
    'tt0050083', //12 angry men
    'tt0108052', //schindler's list
    'tt0167260', //lotr rotk
    'tt0110912', //pulp fiction
    'tt0120737', //lotr fotr
    'tt0109830', //forrest gump
    'tt0060196', //good bad ugly
    'tt0137523', //fight club
    'tt1375666', //inception
    'tt0099685', //goodfellas
    'tt0073486', //one flew over
    'tt0816692', //interstellar
    'tt0133093', //matrix
    'tt0114369', //se7en
    'tt0038650', //wonderful life
    'tt0047478'  //seven samurai
  ];

  try {
    const moviePromises = popularIds.map(id => getMovieById(id));
    const movies = await Promise.all(moviePromises);
    return movies.filter((movie): movie is Movie => movie !== null);
  } catch (error) {
    console.error('error fetching popular movies:', error);
    return [];
  }
};

//todo: add caching to reduce api calls
//maybe add rate limiting handling
//consider adding pagination for search results
