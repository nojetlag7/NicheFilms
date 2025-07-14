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