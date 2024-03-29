import { Injectable } from '@angular/core';
import axios from 'axios';
import { GenreResponce } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class GenresService {
  private BASE_URL = 'https://api.themoviedb.org/3/genre/movie/list';
  private API_KEY = '0f347322078f7ab31991a46962bbff3a'; 
  constructor() { }

 async getGenres() {
    try {
      const response = await axios.get(this.BASE_URL, {
        params: {
          api_key: this.API_KEY,
        },
      });
      console.log('response from getGenres', response);
      const dataGenres = response.data.genres;
  
      return dataGenres;
    } catch (error) {
      console.error(error);
    }
  }

  saveGenresToLocalStorage() {
    console.log('saveGenresToLocalStorage');
    this.getGenres().then(response => {
      localStorage.setItem('genres', JSON.stringify(response));
    });
  }

  getGenresFromLocalStorage() {
    console.log('getGenresFromLocalStorage');

    const storedGenres = localStorage.getItem('genres');
    return storedGenres ? JSON.parse(storedGenres) : [];
  }

  getGenreNameById(genreId: number[]): string {
    const storedGenres = this.getGenresFromLocalStorage();
    if (storedGenres === undefined) {
      return 'Not-found';
    }
  
    let nameGenres: string[] = [];
  
    for (let id of genreId) {
      storedGenres.forEach((genre: GenreResponce)=> {
        if (id === genre.id) {
          nameGenres.push(genre.name);
        }
      });
    } 
    const nameGenresSlice = nameGenres.slice(0, 4);
    if (nameGenres.length > 4) {
      nameGenresSlice.push('etc.');
    }
    console.log("getGenreNameById", nameGenresSlice.join(', '));
  
    return nameGenresSlice.join(', ');
  }

  async getGenreIdByName(genreName: string): Promise<number | null> {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
          api_key: this.API_KEY,
        },
      });
  
      const genres = response.data.genres;
      console.log(genres)
      const genre = genres.find((g: GenreResponce) => g.name === genreName);
  
      if (genre) {
        return genre.id;
      } else {
        return null; 
      }
    } catch (error) {
      console.error('Error fetching genre list', error);
      return null;
    }
  }
}
