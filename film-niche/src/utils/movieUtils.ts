import { Movie } from '../types/types';

//search movies by title, director, actors, or genre
export const searchMovies = (movies: Movie[], searchTerm: string): Movie[] => {
  if (!searchTerm.trim()) return movies;
  
  const term = searchTerm.toLowerCase();
  return movies.filter(movie =>
    movie.title.toLowerCase().includes(term) ||
    movie.director.toLowerCase().includes(term) ||
    movie.actors.toLowerCase().includes(term) ||
    movie.genre.toLowerCase().includes(term)
  );
};

//get single movie by id
export const getMovieById = (movies: Movie[], id: string): Movie | undefined => {
  return movies.find(movie => movie.id === id);
};

//extract unique genres from all movies
export const getUniqueGenres = (movies: Movie[]): string[] => {
  const genreSet = new Set<string>();
  
  movies.forEach(movie => {
    movie.genre.split(', ').forEach(genre => {
      genreSet.add(genre.trim());
    });
  });
  
  return Array.from(genreSet).sort();
};

//extract unique years from all movies
export const getUniqueYears = (movies: Movie[]): number[] => {
  const yearSet = new Set(movies.map(movie => movie.year));
  return Array.from(yearSet).sort((a, b) => b - a);
};

//filter movies by genre, year, and/or minimum rating
export const filterMovies = (
  movies: Movie[],
  filters: {
    genre?: string;
    year?: number;
    minRating?: number;
  }
): Movie[] => {
  return movies.filter(movie => {
    if (filters.genre && !movie.genre.includes(filters.genre)) {
      return false;
    }
    
    if (filters.year && movie.year !== filters.year) {
      return false;
    }
    
    if (filters.minRating && movie.rating < filters.minRating) {
      return false;
    }
    
    return true;
  });
};

//sort movies by title, year, rating, or date added
export const sortMovies = (
  movies: Movie[],
  sortBy: 'title' | 'year' | 'rating' | 'dateAdded',
  order: 'asc' | 'desc' = 'asc'
): Movie[] => {
  const sorted = [...movies].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'year':
        comparison = a.year - b.year;
        break;
      case 'rating':
        comparison = a.rating - b.rating;
        break;
      case 'dateAdded':
        // For mock data, we'll use id as a proxy for date added
        comparison = parseInt(a.id) - parseInt(b.id);
        break;
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
  
  return sorted;
};

//get statistics for watched movies, including total watched, total hours, average rating, and favorite genre
export const getMovieStats = (watchedMovies: Movie[], userRatings: { [key: string]: number }) => {
  if (watchedMovies.length === 0) {
    return {
      totalWatched: 0,
      totalHours: 0,
      averageRating: 0,
      favoriteGenre: '',
      genreStats: {}
    };
  }

  const totalHours = watchedMovies.reduce((total, movie) => {
    const runtime = parseInt(movie.runtime);
    return total + (runtime || 0);
  }, 0);

  const totalMinutes = totalHours;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const genreStats: { [key: string]: number } = {};
  watchedMovies.forEach(movie => {
    movie.genre.split(', ').forEach(genre => {
      const trimmedGenre = genre.trim();
      genreStats[trimmedGenre] = (genreStats[trimmedGenre] || 0) + 1;
    });
  });

  const favoriteGenre = Object.entries(genreStats)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || '';

  const ratingsValues = Object.values(userRatings);
  const averageRating = ratingsValues.length > 0 
    ? ratingsValues.reduce((sum, rating) => sum + rating, 0) / ratingsValues.length 
    : 0;

  return {
    totalWatched: watchedMovies.length,
    totalHours: `${hours}h ${minutes}m`,
    averageRating: Math.round(averageRating * 10) / 10,
    favoriteGenre,
    genreStats
  };
};

//highlight search term in text
export const highlightSearchTerm = (text: string, searchTerm: string): string => {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

//todo: add fuzzy search for better results
//maybe add search by year range
//consider adding search ranking/relevance scoring
