import React from 'react'
import { Movie } from '../types/types'
import { highlightSearchTerm } from '../utils/movieUtils'
import QuickActions from './QuickActions'
import styles from '../styles/movieCard.module.css'

//props for movie card component
interface MovieCardProps {
  movie: Movie;
  searchTerm?: string;
  showQuickActions?: boolean;
  onUpdate?: () => void;
}

//individual movie card component
const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  searchTerm = '',
  showQuickActions = false, //toggle quick actions visibility
  onUpdate
}) => {
  return (
    <div className={styles.movieCard}>
      <div className={styles.posterContainer}>
        <img 
          src={movie.poster} 
          alt={`${movie.title} poster`} 
          className={styles.moviePoster} 
        />
        {/* overlay appears on hover */}
        <div className={styles.overlay}>
          {showQuickActions && (
            <QuickActions movieId={movie.id} onUpdate={onUpdate} />
          )}
          <button className={styles.viewButton}>View Details</button>
        </div>
      </div>
      <div className={styles.movieDetails}>
        {/* highlight search term in title */}
        <h3 
          className={styles.movieTitle}
          dangerouslySetInnerHTML={{ 
            __html: highlightSearchTerm(movie.title, searchTerm) 
          }}
        />
        <p className={styles.movieYear}>{movie.year}</p>
        <p className={styles.movieGenre}>{movie.genre}</p>
        <div className={styles.movieRating}>
          <span className={styles.star}>⭐</span>
          <span>{movie.rating}/10</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

//todo: add loading state for poster images
//maybe add skeleton loader
//consider adding more quick actions