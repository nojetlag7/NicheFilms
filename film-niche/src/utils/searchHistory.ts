export const saveSearchQuery = (query: string): void => {
  if (!query.trim()) return;
  
  const searches = getSearchHistory();
  const filtered = searches.filter(s => s.toLowerCase() !== query.toLowerCase());
  const updated = [query, ...filtered].slice(0, 5); // keeping only 5 recent searches
  
  localStorage.setItem('searchHistory', JSON.stringify(updated));
};

export const getSearchHistory = (): string[] => {
  const history = localStorage.getItem('searchHistory');
  return history ? JSON.parse(history) : [];
};

export const clearSearchHistory = (): void => {
  localStorage.removeItem('searchHistory');
};
