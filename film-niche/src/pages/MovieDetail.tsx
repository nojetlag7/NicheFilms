import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getMovieById } from '../data/mockMovies';
import { Movie } from '../types/types';
import { 
  saveUserRating, 
  getUserRatingForMovie, 
  addToWatched, 
  isMovieWatched 
} from '../utils/localStorage';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import styles from '../styles/movieDetail.module.css';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isWatched, setIsWatched] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      if (!id) {
        navigate('/explore');
        return;
      }

      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const movieData = getMovieById(id);
        
        if (!movieData) {
          navigate('/explore');
          return;
        }

        setMovie(movieData);
        setUserRating(getUserRatingForMovie(id) || 0);
        setIsWatched(isMovieWatched(id));
        setIsFav(isFavorite(id));
      } catch (error) {
        console.error('Error loading movie:', error);
        navigate('/explore');
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id, navigate]);

  const handleRatingClick = (rating: number) => {
    if (!movie) return;
    
    setUserRating(rating);
    saveUserRating(movie.id, rating);
    
    // Also add to watched if not already
    if (!isWatched) {
      addToWatched(movie.id, rating);
      setIsWatched(true);
    }
  };

  const handleWatchedToggle = () => {
    if (!movie) return;
    
    if (isWatched) {
      // Remove from watched (you'd implement this in localStorage utils)
      setIsWatched(false);
    } else {
      addToWatched(movie.id, userRating || undefined);
      setIsWatched(true);
    }
  };

  const handleFavoriteToggle = () => {
    if (id) {
      const newFavStatus = toggleFavorite(id);
      setIsFav(newFavStatus);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Movie not found</h2>
          <button onClick={() => navigate('/explore')} className={styles.backButton}>
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link to="/explore" className={styles.breadcrumbLink}>Explore</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{movie.title}</span>
      </div>
      
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ← Back
      </button>
      
      <div className={styles.movieDetail}>
        <div className={styles.posterSection}>
          <img 
            src={movie.poster} 
            alt={`${movie.title} poster`} 
            className={styles.poster}
          />
        </div>
        
        <div className={styles.infoSection}>
          <h1 className={styles.title}>{movie.title}</h1>
          <div className={styles.metadata}>
            <span className={styles.year}>{movie.year}</span>
            <span className={styles.runtime}>{movie.runtime}</span>
            <span className={styles.released}>Released: {movie.released}</span>
          </div>
          
          <div className={styles.genre}>{movie.genre}</div>
          
          <div className={styles.rating}>
            <span className={styles.star}>⭐</span>
            <span className={styles.ratingValue}>{movie.rating}/10</span>
          </div>
          
          <div className={styles.plot}>
            <h3>Plot</h3>
            <p>{movie.plot}</p>
          </div>
          
          <div className={styles.credits}>
            <div className={styles.creditItem}>
              <strong>Director:</strong> {movie.director}
            </div>
            <div className={styles.creditItem}>
              <strong>Actors:</strong> {movie.actors}
            </div>
          </div>
          
          <div className={styles.userActions}>
            <div className={styles.userRating}>
              <h3>Your Rating</h3>
              <div className={styles.starRating}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <button
                    key={star}
                    className={`${styles.starButton} ${
                      star <= (hoverRating || userRating) ? styles.active : ''
                    }`}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ⭐
                  </button>
                ))}
              </div>
              {userRating > 0 && (
                <p className={styles.ratingText}>You rated this movie {userRating}/10</p>
              )}
            </div>
            
            <button 
              onClick={handleWatchedToggle}
              className={`${styles.watchedButton} ${isWatched ? styles.watched : ''}`}
            >
              {isWatched ? '✓ Watched' : 'Mark as Watched'}
            </button>

            <button 
              onClick={handleFavoriteToggle}
              className={`${styles.favoriteButton} ${isFav ? styles.favorited : ''}`}
            >
              {isFav ? '❤️ In Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
