export const getFavorites = (): string[] => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const addToFavorites = (movieId: string): void => {
  const favorites = getFavorites();
  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

export const removeFromFavorites = (movieId: string): void => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(id => id !== movieId);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

export const isFavorite = (movieId: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(movieId);
};

export const toggleFavorite = (movieId: string): boolean => {
  const favorites = getFavorites();
  const isCurrentlyFavorite = favorites.includes(movieId);
  
  if (isCurrentlyFavorite) {
    removeFromFavorites(movieId);
    return false;
  } else {
    addToFavorites(movieId);
    return true;
  }
};
