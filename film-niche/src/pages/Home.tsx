import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';

//home page component
const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      {/* hero section with welcome message */}
      <div className={styles.heroSection}>
        <h1 className={styles.welcome}>Welcome to NicheFilms</h1>
        <p className={styles.subtitle}>
          Discover, rate, and track your favorite movies
        </p>
        <div className={styles.ctaSection}>
          <Link to="/explore" className={styles.exploreButton}>
            Explore Movies
          </Link>
        </div>
      </div>
      
      {/* features showcase */}
      <div className={styles.featuresSection}>
        <div className={styles.feature}>
          <h3>🎬 Discover Movies</h3>
          <p>Browse through our curated collection of films</p>
        </div>
        <div className={styles.feature}>
          <h3>⭐ Rate & Review</h3>
          <p>Share your opinions and see what others think</p>
        </div>
        <div className={styles.feature}>
          <h3>📝 Track Watched</h3>
          <p>Keep track of movies you've watched</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

//todo: add trending movies section
//maybe add user stats if they have data
//consider adding movie of the day feature
