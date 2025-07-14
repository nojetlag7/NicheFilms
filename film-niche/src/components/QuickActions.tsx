import React from 'react';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { isMovieWatched, addToWatched } from '../utils/localStorage';
import styles from '../styles/quickActions.module.css';

interface QuickActionsProps {
  movieId: string;
  onUpdate?: () => void;
}

//quick actions buttons for movie cards (fav/watched)
const QuickActions: React.FC<QuickActionsProps> = ({ movieId, onUpdate }) => {
  const [isFav, setIsFav] = React.useState(isFavorite(movieId));
  const [isWatched, setIsWatched] = React.useState(isMovieWatched(movieId));

  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); //prevent card click when clicking button
    const newFavStatus = toggleFavorite(movieId);
    setIsFav(newFavStatus);
    onUpdate?.(); //update parent component if needed
  };

  //handle watched button click  
  const handleWatchedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); //prevent card click when clicking button
    if (!isWatched) { //only add if not already watched
      addToWatched(movieId);
      setIsWatched(true);
      onUpdate?.(); //update parent component if needed
    }
  };

  return (
    <div className={styles.quickActions}>
      <button 
        className={`${styles.quickAction} ${isFav ? styles.favorited : ''}`}
        onClick={handleFavoriteClick}
        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFav ? '❤️' : '🤍'}
      </button>
      <button 
        className={`${styles.quickAction} ${isWatched ? styles.watched : ''}`}
        onClick={handleWatchedClick}
        title={isWatched ? 'Already watched' : 'Mark as watched'}
        disabled={isWatched}
      >
        {isWatched ? '✓' : '👁️'}
      </button>
    </div>
  );
};

export default QuickActions;

//todo: add remove from watched functionality later
//maybe add rating quick action too
//consider adding animations for button state changes
