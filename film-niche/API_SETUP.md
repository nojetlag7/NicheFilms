# OMDB API Integration Guide

## getting your api key

1. go to [omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
2. select "free" (1,000 daily requests)
3. enter your email
4. check your email for activation link
5. copy your api key

## setup

1. create `.env` file in root:
```
REACT_APP_OMDB_API_KEY=your_key_here
```

2. restart dev server:
```bash
npm start
```

## how it works

### endpoints used
- **search**: `?s=movie+title` - search movies by title
- **get by id**: `?i=tt1234567` - get movie details by imdb id
- **get by title**: `?t=movie+title` - get exact movie by title

### api limits
- free tier: 1,000 requests/day
- rate limit: ~10 requests/sec
- consider caching results to reduce calls

### features
- search movies in real-time
- fetch full movie details
- display imdb ratings, plot, cast, etc
- fallback to popular movies on explore page

## troubleshooting

**"api key not configured"**
- make sure `.env` has `REACT_APP_OMDB_API_KEY=yourkey`
- restart server after adding env vars

**"failed to load movies"**
- check api key is valid
- check network connection
- verify daily limit not exceeded

**poster images broken**
- omdb returns "N/A" for missing posters
- app falls back to placeholder image

## api response structure

see `src/types/types.ts` for full type definitions.

movie data includes:
- title, year, rating
- plot, genre, director
- actors, runtime
- poster image url
- imdb ratings

## caching (todo)

consider adding:
- localstorage cache for searches
- session storage for details
- cache expiration (1 hour)
- reduce duplicate api calls

## notes

- omdb doesn't have trending/popular endpoint
- popular movies hardcoded with top imdb ids
- search returns max 10 results per page
- pagination requires multiple api calls
