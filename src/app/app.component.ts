// import { Component } from '@angular/core';
// import { GenresService } from './services/genres.service';
// import { IGenre } from './interfaces/interfaces';
// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
// })
// export class AppComponent {
//   public appPages = [
//     { title: 'Movies', url: '/folder/movies', icon: 'videocam' },
//     { title: 'Player', url: '/folder/player', icon: 'play-circle' },
//     { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
//   ];
//   public labels: string[] = []; 
//   genreNames: string[] = [];

//   constructor(private genresService: GenresService) {}

//   ngOnInit() {
//     const genres: IGenre[] = this.genresService.getGenresFromLocalStorage();
//   const uniqueGenreNames = [...new Set(genres.map((genre: any) => genre.name))];
//   this.genreNames = uniqueGenreNames;
//   console.log('uniqueGenreNames', uniqueGenreNames);
//   }
//   handleGenreClick(genre: string) {
//     // Обработайте нажатие на элемент списка жанров здесь
//     // Например, можно выбрать фильмы определенного жанра и обновить список фильмов
//     this.selectedGenre = genre;
//     this.filterMoviesByGenre(genre);
//   }
// }
import { Component } from '@angular/core';
import { GenresService } from './services/genres.service';
import { IGenre } from './interfaces/interfaces';
import { GenreSelectionService } from './services/genre-selection.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Movies', url: '/video-list', icon: 'videocam' },
    { title: 'Player', url: '/video-player', icon: 'play-circle' },
    { title: 'Favorites', url: '/favorite', icon: 'heart' },
  ];
  public labels: string[] = [];
  genreNames: string[] = [];

  constructor(private genresService: GenresService, private genreSelectionService: GenreSelectionService) {}
  ngOnInit() {
    const genres: IGenre[] = this.genresService.getGenresFromLocalStorage();
    const uniqueGenreNames = [...new Set(genres.map((genre: any) => genre.name))];
    this.genreNames = uniqueGenreNames;
    console.log('uniqueGenreNames', uniqueGenreNames);
  }

  handleGenreClick(genre: string) {
    console.log('Selected genre:', genre);
    this.genreSelectionService.setSelectedGenre(genre);
  }
}
