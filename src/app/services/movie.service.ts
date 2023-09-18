import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private API_KEY = '0f347322078f7ab31991a46962bbff3a'; 

  constructor() {}

  getMovies(page: number) {
    const baseURL = 'https://api.themoviedb.org/3/'; 
    const partUrl = 'movie/popular'; 

    return axios.get(`${baseURL}${partUrl}`, {
      params: {
        api_key: this.API_KEY,
        page: page.toString(),
      },
    });
  }

 
getMovieImageUrl(imagePath: string | null): string {
    if (imagePath) {

      return `https://image.tmdb.org/t/p/w500/${imagePath}`;
    } else {
      return '/assets/poster-modal-plug-desktop.jpg';
    }
  }

}
