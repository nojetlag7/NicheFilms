import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/types';
import { getMovieById } from '../services/omdbApi';
import { getFavorites } from '../utils/favorites';
import MovieCard from '../components/movieCard';
import styles from '../styles/favorites.module.css';

//favorites page
const Favorites: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  //load favorites from api
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const favoriteIds = getFavorites();
        
        //fetch movie details from api
        const moviePromises = favoriteIds.map(id => getMovieById(id));
        const movies = await Promise.all(moviePromises);
        const validMovies = movies.filter((movie): movie is Movie => movie !== null);
        
        setFavoriteMovies(validMovies);
      } catch (error) {
        console.error('error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  //refresh favorites when movie is removed
  const handleFavoriteChange = async () => {
    const favoriteIds = getFavorites();
    
    const moviePromises = favoriteIds.map(id => getMovieById(id));
    const movies = await Promise.all(moviePromises);
    const validMovies = movies.filter((movie): movie is Movie => movie !== null);
    
    setFavoriteMovies(validMovies);
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
