
import { Component } from '@angular/core';
import { GenresService } from './services/genres.service';
import { IGenre } from './interfaces/interfaces';
import { GenreSelectionService } from './services/genre-selection.service';
import { Observable } from 'rxjs';

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
  selectedGenre$!: Observable<string>; 

  constructor(private genresService: GenresService, private genreSelectionService: GenreSelectionService) {}
  ngOnInit() {
    const genres: IGenre[] = this.genresService.getGenresFromLocalStorage();
    const uniqueGenreNames = [...new Set(genres.map((genre: any) => genre.name))];
    this.genreNames = uniqueGenreNames;
    this.selectedGenre$ = this.genreSelectionService.selectedGenre$;
  }

  handleGenreClick(genre: string) {
    this.genreSelectionService.setSelectedGenre(genre);
  }
}
