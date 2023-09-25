export interface IMovie {
    id: number;
    title: string;
    release_year: number; 
    poster_path: string;
    genre_ids: number[]; 
    genreName: string
  }

  export interface IGenre {
    name: string;
  }
  