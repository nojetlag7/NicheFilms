import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWatchedMovies, getUserRatingsAsObject } from '../utils/localStorage';
import { getMovieById } from '../data/mockMovies';
import { getMovieStats } from '../utils/movieUtils';
import { Movie, WatchedMovie } from '../types/types';
import styles from '../styles/watched.module.css';

const Watched: React.FC = () => {
  const [watchedMovies, setWatchedMovies] = useState<(Movie & { watchedAt: number, userRating?: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'title'>('date');
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const loadWatchedMovies = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const watched = getWatchedMovies();
        const moviesWithDetails = watched
          .map(w => {
            const movie = getMovieById(w.movieId);
            return movie ? { ...movie, watchedAt: w.watchedAt, userRating: w.userRating } : null;
          })
          .filter(Boolean) as (Movie & { watchedAt: number, userRating?: number })[];
        
        setWatchedMovies(moviesWithDetails);
      } catch (error) {
        console.error('Error loading watched movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWatchedMovies();
  }, []);

  const sortedMovies = [...watchedMovies].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return b.watchedAt - a.watchedAt;
      case 'rating':
        return (b.userRating || 0) - (a.userRating || 0);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const userRatings = getUserRatingsAsObject();
  const stats = getMovieStats(watchedMovies, userRatings);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading watched movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Your Watched Movies</h1>
        <p className={styles.subtitle}>
          {watchedMovies.length} movie{watchedMovies.length !== 1 ? 's' : ''} watched
        </p>
      </div>

      {watchedMovies.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No movies watched yet</h2>
          <p>Start exploring movies and mark them as watched!</p>
          <Link to="/explore" className={styles.exploreButton}>
            Explore Movies
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.controls}>
            <div className={styles.sortControls}>
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as 'date' | 'rating' | 'title')}
                className={styles.sortSelect}
              >
                <option value="date">Date Watched</option>
                <option value="rating">Your Rating</option>
                <option value="title">Title</option>
              </select>
            </div>
            
            <button 
              onClick={() => setShowStats(!showStats)}
              className={styles.statsToggle}
            >
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </button>
          </div>

          {showStats && (
            <div className={styles.statsSection}>
              <h3>Your Movie Stats</h3>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Total Watched</span>
                  <span className={styles.statValue}>{stats.totalWatched}</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Total Hours</span>
                  <span className={styles.statValue}>{stats.totalHours}</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Average Rating</span>
                  <span className={styles.statValue}>{stats.averageRating}/10</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Favorite Genre</span>
                  <span className={styles.statValue}>{stats.favoriteGenre || 'None'}</span>
                </div>
              </div>
              
              {Object.keys(stats.genreStats).length > 0 && (
                <div className={styles.genreBreakdown}>
                  <h4>Genre Breakdown</h4>
                  <div className={styles.genreStats}>
                    {Object.entries(stats.genreStats).map(([genre, count]) => (
                      <div key={genre} className={styles.genreStat}>
                        <span className={styles.genreName}>{genre}</span>
                        <span className={styles.genreCount}>{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className={styles.moviesGrid}>
            {sortedMovies.map((movie) => (
              <div key={movie.id} className={styles.movieCard}>
                <Link to={`/movie/${movie.id}`} className={styles.movieLink}>
                  <div className={styles.posterContainer}>
                    <img 
                      src={movie.poster} 
                      alt={`${movie.title} poster`} 
                      className={styles.poster}
                    />
                  </div>
                  <div className={styles.movieInfo}>
                    <h3 className={styles.title}>{movie.title}</h3>
                    <p className={styles.year}>{movie.year}</p>
                    <p className={styles.genre}>{movie.genre}</p>
                    
                    <div className={styles.ratings}>
                      <div className={styles.movieRating}>
                        <span className={styles.star}>⭐</span>
                        <span>{movie.rating}/10</span>
                      </div>
                      {movie.userRating && (
                        <div className={styles.userRating}>
                          <span className={styles.userStar}>👤</span>
                          <span>{movie.userRating}/10</span>
                        </div>
                      )}
                    </div>
                    
                    <div className={styles.watchedDate}>
                      Watched: {new Date(movie.watchedAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Watched;
