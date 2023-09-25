import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { IMovie } from 'src/app/interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GenresService } from 'src/app/services/genres.service';
import { GenreSelectionService } from 'src/app/services/genre-selection.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.page.html',
  styleUrls: ['./video-list.page.scss'],
})
export class VideoListPage implements OnInit {
  public movies: IMovie[] = [];
  currentPage = 1;
  public labels: string[] = [];
  selectedGenreId?: number;
  moviesByGenre: { [key: string]: IMovie[] } = {};
  

  constructor(
    public movieService: MovieService,
    public navCtrl: NavController,
    private sanitizer: DomSanitizer, 
    private route: ActivatedRoute,
    private genresService: GenresService,
    private genreSelectionService: GenreSelectionService,
        ) { }
     
        async getGenreIdAndFilterMovies(selectedGenre: string) {
          console.log('getGenreIdAndFilterMovies', selectedGenre);
          const genreId = await this.genresService.getGenreIdByName(selectedGenre);
          if (genreId !== null) {
            this.selectedGenreId = genreId;
            this.filterMoviesByGenre(this.selectedGenreId);
          }
          console.log("genreId from getGenreIdAndFilterMovies", genreId);
        }

        ngOnInit() {
    this.loadMovies();
    this.labels = this.route.snapshot.data['labels'];
    this.genresService.saveGenresToLocalStorage();
    this.genreSelectionService.selectedGenre$.subscribe((selectedGenre) => {
      this.getGenreIdAndFilterMovies(selectedGenre);
    });
  }

  
  loadMovies() {
    console.log("this.selectedGenreId from loadMovies",  this.selectedGenreId);
    this.movieService.getMovies(1, this.selectedGenreId)
      .then((response) => {
        const movies = response.data.results.map((movie: IMovie) => ({
          ...movie,
          titleWithYear: `${movie.title} (${movie.release_year})`,
        }
        
        ));
         this.movies = movies;
      })
      .catch((error) => {
        console.error('Error fetching movies', error);
      });
  }
  
  
  loadMoreData(event: Event) {
    const nextPage = this.currentPage + 1;
    this.movieService.getMovies(nextPage, this.selectedGenreId)
      .then((response) => {
        const newMovies = response.data.results;
  
        this.movies = [...this.movies, ...newMovies];
  
        this.currentPage = nextPage;
  
        const infiniteScroll = event.target as IonInfiniteScroll | null;
        if (infiniteScroll) {
          infiniteScroll.complete();
  
          if (!newMovies.length) {
            infiniteScroll.disabled = true;
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching more movies', error);
  
        if (event.target instanceof IonInfiniteScroll) {
          event.target.complete();
        }
      });
  }
  

  async openVideoPlayer(movieId: number) {
    const key = await this.movieService.getMovieById(movieId);
    if (key) {
      const videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${key}`);
      this.navCtrl.navigateForward(`/video-player/${movieId}`, { state: { videoUrl } });
    } else {
      console.log('Video not found.');
    }
  }

  filterMoviesByGenre(genreId: number) {
    console.log("genreId from filterMoviesByGenre", genreId);
    if (!genreId || genreId === 0) {
      console.log("if (!genre)");
      // Если жанр не выбран или выбран "All", отображаем все фильмы
      this.movies = this.moviesByGenre['All'];
    } else if (this.moviesByGenre[genreId]) {
      console.log("if (this.moviesByGenre[genre])", this.moviesByGenre[genreId]);
      // Если фильмы для выбранного жанра уже загружены, отображаем их
      this.movies = this.moviesByGenre[genreId];
    } else {
      console.log("else");
      this.loadMovies();
     ;
      
        console.log("this.selectedGenre", this.selectedGenreId);
  
    }
  }
  


}
