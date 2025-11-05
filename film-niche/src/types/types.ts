//movie type for app use
export type Movie = {
    id: string;
    title: string;
    year: number;
    poster: string;
    rating: number;
    genre: string;
    plot: string;
    director: string;
    actors: string;
    runtime: string;
    released: string;
}

//omdb api response types
export type OMDBRating = {
    Source: string;
    Value: string;
}

export type OMDBMovie = {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: OMDBRating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

//omdb search result item
export type OMDBSearchResult = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

//omdb search response
export type OMDBSearchResponse = {
    Search: OMDBSearchResult[];
    totalResults: string;
    Response: string;
    Error?: string;
}

export type MovieCardProps = {
    title: string;
    year: number;
    poster: string;
    rating: number;
    genre?: string;
}

export type UserRating = {
    movieId: string;
    rating: number;
    timestamp: number;
}

export type WatchedMovie = {
    movieId: string;
    watchedAt: number;
    userRating?: number;
}