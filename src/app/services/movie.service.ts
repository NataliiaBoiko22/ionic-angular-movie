import { Injectable } from '@angular/core';
import axios from 'axios';
import { DomSanitizer } from '@angular/platform-browser';
import { IMovie } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private API_KEY = '0f347322078f7ab31991a46962bbff3a'; 

  constructor(private sanitizer: DomSanitizer) {}

  getMovies(page: number, genreId?: number) {
    console.log('GET MOVIE');
    const baseURL = 'https://api.themoviedb.org/3/'; 
    let partUrl = 'movie/popular'; 
    if (genreId) {
      console.log('IF GENRE ID', genreId);
      partUrl = 'discover/movie'; 
    }
    return axios.get(`${baseURL}${partUrl}`, {
      params: {
        api_key: this.API_KEY,
        page: page.toString(),
        with_genres: genreId,
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
  async getMovieById(movieId: number) {
    console.log('getMovieById');
    const baseURL = 'https://api.themoviedb.org/3/';
    const partUrl = `movie/${movieId}`;
    console.log('partUrl', partUrl);
    try {
      const videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${baseURL}${partUrl}/videos?api_key=${this.API_KEY}`);

      console.log('VIDEO URL', videoUrl);
      const response = await axios.get(`${baseURL}${partUrl}/videos?api_key=${this.API_KEY}`,
    {
        params: {
          api_key: this.API_KEY,
        },
      });
      console.log('RESPONSE', response);
      const data = response.data.results;
      console.log('DATA', response.data.results);
    if (data.length === 0 || data === undefined) {
      alert('Sorry, trailer not found.');
      return;
    }

    let objectTrailer = data.find((obj: any) =>
      obj.name.split(' ').includes('Trailer')
      
    );
    console.log("objectTrailer", objectTrailer);

    if (objectTrailer === undefined) {
      objectTrailer = data[0];
    }

    const key = objectTrailer.key;
    console.log('key', key);
    return key;
    } catch (error) {
      throw new Error('Error');
    }
  }


 async searchMovies(query: string): Promise<IMovie[]> {
    console.log('SEARCH MOVIES', query);
    const baseURL = 'https://api.themoviedb.org/3/';
    const partUrl = 'search/movie';
  
    return axios.get(`${baseURL}${partUrl}`, {
      params: {
        api_key: this.API_KEY,
        query: query,
      },
    })
    .then((response) => {
      const movies = response.data.results.map((movie: IMovie) => ({
        ...movie,
        titleWithYear: `${movie.title} (${movie.release_date})`,
      }));
      return movies;
    });
  }
  
  
}

