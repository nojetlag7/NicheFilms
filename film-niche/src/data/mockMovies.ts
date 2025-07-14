import { Movie } from '../types/types';

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    year: 2010,
    poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    rating: 8.8,
    genre: 'Action, Sci-Fi, Thriller',
    plot: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    director: 'Christopher Nolan',
    actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
    runtime: '148 min',
    released: '16 Jul 2010'
  },
  {
    id: '2',
    title: 'The Matrix',
    year: 1999,
    poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    rating: 8.7,
    genre: 'Action, Sci-Fi',
    plot: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    director: 'The Wachowski Brothers',
    actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
    runtime: '136 min',
    released: '31 Mar 1999'
  },
  {
    id: '3',
    title: 'The Dark Knight',
    year: 2008,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
    rating: 9.0,
    genre: 'Action, Crime, Drama',
    plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    director: 'Christopher Nolan',
    actors: 'Christian Bale, Heath Ledger, Aaron Eckhart',
    runtime: '152 min',
    released: '18 Jul 2008'
  },
  {
    id: '4',
    title: 'Interstellar',
    year: 2014,
    poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    rating: 8.6,
    genre: 'Adventure, Drama, Sci-Fi',
    plot: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    director: 'Christopher Nolan',
    actors: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
    runtime: '169 min',
    released: '07 Nov 2014'
  },
  {
    id: '5',
    title: 'Pulp Fiction',
    year: 1994,
    poster: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    rating: 8.9,
    genre: 'Crime, Drama',
    plot: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    director: 'Quentin Tarantino',
    actors: 'John Travolta, Uma Thurman, Samuel L. Jackson',
    runtime: '154 min',
    released: '14 Oct 1994'
  },
  {
    id: '6',
    title: 'The Shawshank Redemption',
    year: 1994,
    poster: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    rating: 9.3,
    genre: 'Drama',
    plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    director: 'Frank Darabont',
    actors: 'Tim Robbins, Morgan Freeman, Bob Gunton',
    runtime: '142 min',
    released: '14 Oct 1994'
  },
  {
    id: '7',
    title: 'The Godfather',
    year: 1972,
    poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    rating: 9.2,
    genre: 'Crime, Drama',
    plot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    director: 'Francis Ford Coppola',
    actors: 'Marlon Brando, Al Pacino, James Caan',
    runtime: '175 min',
    released: '24 Mar 1972'
  },
  {
    id: '8',
    title: 'Fight Club',
    year: 1999,
    poster: 'https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY4NTM@._V1_SX300.jpg',
    rating: 8.8,
    genre: 'Drama, Thriller',
    plot: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much more.',
    director: 'David Fincher',
    actors: 'Brad Pitt, Edward Norton, Helena Bonham Carter',
    runtime: '139 min',
    released: '15 Oct 1999'
  },
  {
    id: '9',
    title: 'Forrest Gump',
    year: 1994,
    poster: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    rating: 8.8,
    genre: 'Drama, Romance',
    plot: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.',
    director: 'Robert Zemeckis',
    actors: 'Tom Hanks, Robin Wright, Gary Sinise',
    runtime: '142 min',
    released: '06 Jul 1994'
  },
  {
    id: '10',
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
    poster: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWI5MTktXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    rating: 8.9,
    genre: 'Adventure, Drama, Fantasy',
    plot: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
    director: 'Peter Jackson',
    actors: 'Elijah Wood, Viggo Mortensen, Ian McKellen',
    runtime: '201 min',
    released: '17 Dec 2003'
  },
  {
    id: '11',
    title: 'Goodfellas',
    year: 1990,
    poster: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjA4YTQyYzliYzQyXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    rating: 8.7,
    genre: 'Biography, Crime, Drama',
    plot: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.',
    director: 'Martin Scorsese',
    actors: 'Robert De Niro, Ray Liotta, Joe Pesci',
    runtime: '146 min',
    released: '21 Sep 1990'
  },
  {
    id: '12',
    title: 'The Empire Strikes Back',
    year: 1980,
    poster: 'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    rating: 8.7,
    genre: 'Action, Adventure, Fantasy',
    plot: 'After the Rebels are overpowered by the Empire, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader.',
    director: 'Irvin Kershner',
    actors: 'Mark Hamill, Harrison Ford, Carrie Fisher',
    runtime: '124 min',
    released: '20 Jun 1980'
  },
  {
    id: '13',
    title: 'Spider-Man: Into the Spider-Verse',
    year: 2018,
    poster: 'https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX300.jpg',
    rating: 8.4,
    genre: 'Animation, Action, Adventure',
    plot: 'Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.',
    director: 'Bob Persichetti, Peter Ramsey, Rodney Rothman',
    actors: 'Shameik Moore, Jake Johnson, Hailee Steinfeld',
    runtime: '117 min',
    released: '14 Dec 2018'
  },
  {
    id: '14',
    title: 'Parasite',
    year: 2019,
    poster: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
    rating: 8.5,
    genre: 'Drama, Thriller',
    plot: 'A poor family schemes to become employed by a wealthy family by infiltrating their household and posing as unrelated, highly qualified individuals.',
    director: 'Bong Joon Ho',
    actors: 'Kang-ho Song, Sun-kyun Lee, Yeo-jeong Jo',
    runtime: '132 min',
    released: '30 May 2019'
  },
  {
    id: '15',
    title: 'Avengers: Endgame',
    year: 2019,
    poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg',
    rating: 8.4,
    genre: 'Action, Adventure, Drama',
    plot: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. The Avengers assemble once more to undo Thanos\' actions.',
    director: 'Anthony Russo, Joe Russo',
    actors: 'Robert Downey Jr., Chris Evans, Mark Ruffalo',
    runtime: '181 min',
    released: '26 Apr 2019'
  },
  {
    id: '16',
    title: 'Mad Max: Fury Road',
    year: 2015,
    poster: 'https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    rating: 8.1,
    genre: 'Action, Adventure, Sci-Fi',
    plot: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners.',
    director: 'George Miller',
    actors: 'Tom Hardy, Charlize Theron, Nicholas Hoult',
    runtime: '120 min',
    released: '15 May 2015'
  },
  {
    id: '17',
    title: 'Blade Runner 2049',
    year: 2017,
    poster: 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg',
    rating: 8.0,
    genre: 'Action, Drama, Mystery',
    plot: 'A young blade runner\'s discovery of a long-buried secret leads him to track down former blade runner Rick Deckard.',
    director: 'Denis Villeneuve',
    actors: 'Harrison Ford, Ryan Gosling, Ana de Armas',
    runtime: '164 min',
    released: '06 Oct 2017'
  },
  {
    id: '18',
    title: 'The Social Network',
    year: 2010,
    poster: 'https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    rating: 7.7,
    genre: 'Biography, Drama',
    plot: 'The story of Facebook\'s creation and the lawsuits that followed, focusing on founder Mark Zuckerberg during his time at Harvard.',
    director: 'David Fincher',
    actors: 'Jesse Eisenberg, Andrew Garfield, Justin Timberlake',
    runtime: '120 min',
    released: '01 Oct 2010'
  },
  {
    id: '19',
    title: 'Dune',
    year: 2021,
    poster: 'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    rating: 8.0,
    genre: 'Action, Adventure, Drama',
    plot: 'Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to Arrakis.',
    director: 'Denis Villeneuve',
    actors: 'Timothée Chalamet, Rebecca Ferguson, Zendaya',
    runtime: '155 min',
    released: '22 Oct 2021'
  },
  {
    id: '20',
    title: 'Joker',
    year: 2019,
    poster: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    rating: 8.4,
    genre: 'Crime, Drama, Thriller',
    plot: 'A mentally troubled comedian is disregarded by society and embarks on a downward spiral that leads to the creation of an iconic villain.',
    director: 'Todd Phillips',
    actors: 'Joaquin Phoenix, Robert De Niro, Zazie Beetz',
    runtime: '122 min',
    released: '04 Oct 2019'
  }
];

export const getMovieById = (id: string): Movie | undefined => {
  return mockMovies.find(movie => movie.id === id);
};

export const searchMovies = (query: string): Movie[] => {
  if (!query) return mockMovies;
  return mockMovies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.genre.toLowerCase().includes(query.toLowerCase())
  );
};
