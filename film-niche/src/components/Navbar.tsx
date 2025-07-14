import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSearchHistory, saveSearchQuery } from '../utils/searchHistory';
import styles from '../styles/navbar.module.css';


const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null); //ref for click outside detection

  //load search history on mount
  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  //handle clicking outside search to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  //handle search form submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveSearchQuery(searchQuery); //save to history
      setSearchHistory(getSearchHistory()); //refresh history
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
      setSearchQuery('');
    }
  };

  //handle clicking on search suggestion
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    navigate(`/explore?search=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
    setSearchQuery('');
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>NicheFilms</Link>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/explore" className={styles.navLink}>Explore</Link>
        <Link to="/watched" className={styles.navLink}>Watched</Link>
        <Link to="/favorites" className={styles.navLink}>Favorites</Link>
      </div>
      <div className={styles.searchContainer} ref={searchRef}>
        <form onSubmit={handleSearch} className={styles.searchBar}>
          <input 
            className={styles.searchInput} 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search for a movie..." 
          />
          <button type="submit" className={styles.searchButton}>Search</button>
        </form>
        
        {showSuggestions && searchHistory.length > 0 && (
          <div className={styles.searchSuggestions}>
            <div className={styles.suggestionsHeader}>Recent Searches</div>
            {searchHistory.map((suggestion, index) => (
              <button
                key={index}
                className={styles.suggestionItem}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                🕐 {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

//todo: add voice search functionality
//maybe add recent searches limit
//consider adding search autocomplete from movie titles
