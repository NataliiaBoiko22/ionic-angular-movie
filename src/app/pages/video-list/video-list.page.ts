import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.page.html',
  styleUrls: ['./video-list.page.scss'],
})
export class VideoListPage implements OnInit {
  public movies: any[] = []; 
  currentPage = 1;

  constructor(public movieService: MovieService) { }

  ngOnInit() {
    this.loadMovies();
  }
  loadMovies() {
    this.movieService.getMovies(1)
    .then((response) => {
      this.movies = response.data.results.map((movie: Movie) => ({
        ...movie,
        titleWithYear: `${movie.title} (${movie.release_year})`,
      }));
      })
      .catch((error) => {
        console.error('Error fetching movies', error);
      });
  }

  loadMoreData(event: Event) {
    const nextPage = this.currentPage + 1;
  
    this.movieService.getMovies(nextPage)
      .then((response) => {
        const newMovies = response.data.results;
  
        this.movies = [...this.movies, ...newMovies];
  
        this.currentPage = nextPage;
  
      const infiniteScroll = event.target as IonInfiniteScroll | null;;
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
}
