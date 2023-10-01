export interface IMovie {
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
  }

  export interface IGenre {
    name: string;
  }
  