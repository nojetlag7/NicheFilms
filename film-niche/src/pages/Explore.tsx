import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Movie } from '../types/types';
import { getPopularMovies, searchMoviesByTitle } from '../services/omdbApi';
import { filterMovies, sortMovies, getUniqueGenres, getUniqueYears } from '../utils/movieUtils';
import MovieCard from '../components/movieCard';
import styles from '../styles/explore.module.css';

//explore page with search, filter, sort
const Explore: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const [minRating, setMinRating] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'rating' | 'dateAdded'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedMovieIndex, setSelectedMovieIndex] = useState<number>(-1);
  const [isKeyboardNavigating, setIsKeyboardNavigating] = useState(false);

  const genres = getUniqueGenres(movies);
  const years = getUniqueYears(movies);
  const navigate = useNavigate();

  //load movies from api
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const searchQuery = searchParams.get('search') || '';
        setSearchTerm(searchQuery);
        
        //fetch from omdb api
        let result: Movie[];
        if (searchQuery.trim()) {
          result = await searchMoviesByTitle(searchQuery);
        } else {
          result = await getPopularMovies();
        }
        
        setMovies(result);
      } catch (err) {
        console.error('error loading movies:', err);
        setError('failed to load movies. check your api key and connection.');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [searchParams]);

  //apply filters and sorting
  useEffect(() => {
    let result = [...movies];
    
    //apply filters
    result = filterMovies(result, {
      genre: selectedGenre || undefined,
      year: selectedYear || undefined,
      minRating: minRating || undefined
    });

    //apply sorting
    result = sortMovies(result, sortBy, sortOrder);

    setFilteredMovies(result);
  }, [movies, selectedGenre, selectedYear, minRating, sortBy, sortOrder]);

  //keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (filteredMovies.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedMovieIndex(prev => 
            prev < filteredMovies.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedMovieIndex(prev => 
            prev > 0 ? prev - 1 : filteredMovies.length - 1
          );
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (viewMode === 'grid') {
            const itemsPerRow = Math.floor(window.innerWidth / 300); // Approximate items per row
            setSelectedMovieIndex(prev => 
              Math.min(prev + itemsPerRow, filteredMovies.length - 1)
            );
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (viewMode === 'grid') {
            const itemsPerRow = Math.floor(window.innerWidth / 300);
            setSelectedMovieIndex(prev => 
              Math.max(prev - itemsPerRow, 0)
            );
          }
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedMovieIndex >= 0) {
            const selectedMovie = filteredMovies[selectedMovieIndex];
            window.location.href = `/movie/${selectedMovie.id}`;
          }
          break;
        case 'Escape':
          setSelectedMovieIndex(-1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredMovies, selectedMovieIndex, viewMode]);

  const handleMouseEnter = (index: number) => {
    if (!isKeyboardNavigating) {
      setSelectedMovieIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isKeyboardNavigating) {
      setSelectedMovieIndex(-1);
    }
  };

  const handleClick = () => {
    setIsKeyboardNavigating(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const clearFilters = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setMinRating('');
    setSortBy('title');
    setSortOrder('asc');
  };

  const hasActiveFilters = selectedGenre || selectedYear || minRating || sortBy !== 'title' || sortOrder !== 'asc';

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          {searchTerm ? `Search Results for "${searchTerm}"` : 'Explore Movies'}
        </h1>
        <div className={styles.controls}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </form>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className={styles.select}
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="year">Year:</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : '')}
            className={styles.select}
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="rating">Min Rating:</label>
          <select
            id="rating"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value ? parseFloat(e.target.value) : '')}
            className={styles.select}
          >
            <option value="">Any Rating</option>
            <option value="7">7.0+</option>
            <option value="8">8.0+</option>
            <option value="9">9.0+</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="sort">Sort By:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'title' | 'year' | 'rating' | 'dateAdded')}
            className={styles.select}
          >
            <option value="title">Title</option>
            <option value="year">Year</option>
            <option value="rating">Rating</option>
            <option value="dateAdded">Recently Added</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="order">Order:</label>
          <select
            id="order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className={styles.select}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button onClick={clearFilters} className={styles.clearFilters}>
            Clear Filters
          </button>
        )}
      </div>

      <div className={styles.resultsInfo}>
        <p>Showing {filteredMovies.length} of {movies.length} movies</p>
      </div>

      {filteredMovies.length === 0 ? (
        <div className={styles.noResults}>
          <h2>No movies found</h2>
          <p>Try adjusting your search terms or filters.</p>
          <Link to="/explore" className={styles.browseAllButton}>
            Browse All Movies
          </Link>
        </div>
      ) : (
        <div className={`${styles.moviesGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
          {filteredMovies.map((movie, index) => (
            <Link 
              key={movie.id} 
              to={`/movie/${movie.id}`} 
              className={`${styles.movieLink} ${
                selectedMovieIndex === index ? styles.selectedMovie : ''
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              <MovieCard movie={movie} searchTerm={searchTerm} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
