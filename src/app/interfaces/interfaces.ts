export interface Movie {
    id: number;
    title: string;
    release_date: number; 
    poster_path: string;
    genre_ids: number[]; 
    genreName: string;
    original_title: string;
    vote_average:number;
    vote_count:number;
    popularity: number;
    overview:string;
    isFavourite: boolean;

  }

  export interface Genre {
    name: string;
  }
  
  export interface GenreResponce {
    id: number;
    name: string;
  }