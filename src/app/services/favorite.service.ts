import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  public favoriteMovies: Movie[] = [];
  private movieStatus: { [movieId: number]: boolean } = {};


  constructor() {
    this.loadFavorites();
  }

  addToFavorites(movie: Movie) {
    this.favoriteMovies.push(movie);
    this.movieStatus[movie.id] = true;
    this.saveFavorites();
  }

  removeFromFavorites(movie: Movie) {
    const index = this.favoriteMovies.findIndex((m) => m.id === movie.id);
    if (index !== -1) {
      this.favoriteMovies.splice(index, 1);
      this.movieStatus[movie.id] = false;
    }
    this.saveFavorites();
  }

  isInFavorites(movieId: number): boolean {
    return this.movieStatus[movieId] === true;
  }


  getFavoriteMovies(): Movie[] {
    return this.favoriteMovies;
  }

  private saveFavorites() {
    localStorage.setItem('favoriteMovies', JSON.stringify(this.favoriteMovies));
    localStorage.setItem('movieStatus', JSON.stringify(this.movieStatus));
  }

  private loadFavorites() {
    const data = localStorage.getItem('favoriteMovies');
    if (data) {
      this.favoriteMovies = JSON.parse(data);
    }
    const statusData = localStorage.getItem('movieStatus');
    if (statusData) {
      this.movieStatus = JSON.parse(statusData);
    }
  }
  }


