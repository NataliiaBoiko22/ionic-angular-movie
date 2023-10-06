import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { IMovie } from 'src/app/interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GenresService } from 'src/app/services/genres.service';
import { GenreSelectionService } from 'src/app/services/genre-selection.service';
import { AlertController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { ModalService } from 'src/app/services/modal.service';
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
  searchQuery: string = '';
  selectedGenre: string | null = null;
  @ViewChild(IonContent) ionContent!: IonContent;


  constructor(
    public movieService: MovieService,
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private genresService: GenresService,
    private genreSelectionService: GenreSelectionService,
    public modalService: ModalService,
    private alertController: AlertController,
    ) { this.genreSelectionService.selectedGenre$.subscribe((genre) => {
      this.selectedGenre = genre;
    }); }
     
        async getGenreIdAndFilterMovies(selectedGenre: string) {
          const genreId = await this.genresService.getGenreIdByName(selectedGenre);
          if (genreId !== null) {
            this.selectedGenreId = genreId;
            this.filterMoviesByGenre(this.selectedGenreId);
          }
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
    this.movieService.getMovies(1, this.selectedGenreId)
      .then((response) => {
        const movies = response.data.results.map((movie: IMovie) => ({
          ...movie,
          titleWithYear: `${movie.title} (${movie.release_date})`,
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
  

  filterMoviesByGenre(genreId: number) {
    if (!genreId || genreId === 0) {
      this.movies = this.moviesByGenre['All'];
    } else if (this.moviesByGenre[genreId]) {
      this.movies = this.moviesByGenre[genreId];
    } else {
      this.loadMovies();
     
        
    }
  }

  async onSearchInput(event: any) {
    if (event.key === 'Enter') {
      const query = this.searchQuery;
  
      try {
        const movies = await this.movieService.searchMovies(query);
  
        this.movies = movies;
  
        if (movies.length === 0) {
          await this.showNoResultsAlert(); 
        }
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    }
  }
  
  


  async showNoResultsAlert() {
      const alert = await this.alertController.create({
        header: 'No Results',
        message: 'Your search did not return any results.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.searchQuery = ''; 
            },
          },
        ],
      });

      await alert.present();
  }

  scrollToTop() {
    this.ionContent.scrollToTop(300); 
  }
  

  clearGenreSelection() {
    this.selectedGenre = '';
    this.selectedGenreId = undefined;
    this.genreSelectionService.setSelectedGenre('');
    this.loadMovies(); 
     }
}

  


