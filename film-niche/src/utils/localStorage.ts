import { UserRating, WatchedMovie } from '../types/types';

//save user rating to localstorage
export const saveUserRating = (movieId: string, rating: number): void => {
  const ratings = getUserRatings();
  const existingIndex = ratings.findIndex(r => r.movieId === movieId);
  
  const newRating: UserRating = {
    movieId,
    rating,
    timestamp: Date.now()
  };
  
  if (existingIndex >= 0) {
    ratings[existingIndex] = newRating; //update existing rating
  } else {
    ratings.push(newRating); //add new rating
  }
  
  localStorage.setItem('userRatings', JSON.stringify(ratings));
};

//get all user ratings from localstorage
export const getUserRatings = (): UserRating[] => {
  const ratings = localStorage.getItem('userRatings');
  return ratings ? JSON.parse(ratings) : [];
};

//get ratings as object for easy lookup
export const getUserRatingsAsObject = (): { [key: string]: number } => {
  const ratings = getUserRatings();
  return ratings.reduce((acc, rating) => {
    acc[rating.movieId] = rating.rating;
    return acc;
  }, {} as { [key: string]: number });
};

export const getUserRatingForMovie = (movieId: string): number | undefined => {
  const ratings = getUserRatings();
  const rating = ratings.find(r => r.movieId === movieId);
  return rating?.rating;
};

export const addToWatched = (movieId: string, userRating?: number): void => {
  const watched = getWatchedMovies();
  const existingIndex = watched.findIndex(w => w.movieId === movieId);
  
  const watchedMovie: WatchedMovie = {
    movieId,
    watchedAt: Date.now(),
    userRating
  };
  
  if (existingIndex >= 0) {
    watched[existingIndex] = watchedMovie;
  } else {
    watched.push(watchedMovie);
  }
  
  localStorage.setItem('watchedMovies', JSON.stringify(watched));
};

export const getWatchedMovies = (): WatchedMovie[] => {
  const watched = localStorage.getItem('watchedMovies');
  return watched ? JSON.parse(watched) : [];
};

export const isMovieWatched = (movieId: string): boolean => {
  const watched = getWatchedMovies();
  return watched.some(w => w.movieId === movieId);
};

export const removeFromWatched = (movieId: string): void => {
  const watched = getWatchedMovies();
  const filtered = watched.filter(w => w.movieId !== movieId);
  localStorage.setItem('watchedMovies', JSON.stringify(filtered));
};

export const clearAllWatched = (): void => {
  localStorage.removeItem('watchedMovies');
};

export const clearAllRatings = (): void => {
  localStorage.removeItem('userRatings');
};

export const getWatchedMovieStats = () => {
  const watched = getWatchedMovies();
  const ratings = getUserRatings();
  
  const totalWatched = watched.length;
  const totalRated = ratings.length;
  const averageRating = ratings.length > 0 
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
    : 0;
    
  return {
    totalWatched,
    totalRated,
    averageRating: Math.round(averageRating * 10) / 10
  };
};

//todo: add rating validation
//maybe add rating categories (story, acting, etc)
//consider adding rating export functionality
