import { Injectable } from '@angular/core';
import axios from 'axios';
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

  getGenreNameById(genreId: number): string {
    const storedGenres = this.getGenresFromLocalStorage();
    const genre = storedGenres.find((g: any) => g.id === genreId);
    return genre ? genre.name : 'Unknown';
  }

  async getGenreIdByName(genreName: string): Promise<number | null> {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
          api_key: this.API_KEY,
        },
      });
  
      const genres = response.data.genres;
      const genre = genres.find((g: any) => g.name === genreName);
  
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
