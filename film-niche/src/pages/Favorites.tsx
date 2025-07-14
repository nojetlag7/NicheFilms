import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/types';
import { mockMovies } from '../data/mockMovies';
import { getFavorites } from '../utils/favorites';
import MovieCard from '../components/movieCard';
import styles from '../styles/favorites.module.css';

const Favorites: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const favoriteIds = getFavorites();
        const favorites = mockMovies.filter(movie => favoriteIds.includes(movie.id));
        setFavoriteMovies(favorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleFavoriteChange = () => {
    // Refresh favorites when a movie is removed
    const favoriteIds = getFavorites();
    const favorites = mockMovies.filter(movie => favoriteIds.includes(movie.id));
    setFavoriteMovies(favorites);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Favorites</h1>
        <p className={styles.subtitle}>
          {favoriteMovies.length} favorite movie{favoriteMovies.length !== 1 ? 's' : ''}
        </p>
      </div>

      {favoriteMovies.length === 0 ? (
        <div className={styles.empty}>
          <h2>No favorites yet</h2>
          <p>Start exploring movies and add them to your favorites!</p>
          <Link to="/explore" className={styles.exploreButton}>
            Explore Movies
          </Link>
        </div>
      ) : (
        <div className={styles.moviesGrid}>
          {favoriteMovies.map((movie) => (
            <div key={movie.id} className={styles.movieWrapper}>
              <Link to={`/movie/${movie.id}`} className={styles.movieLink}>
                <MovieCard 
                  movie={movie} 
                  showQuickActions={true}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
