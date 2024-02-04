import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/interfaces/interfaces';
import { MovieService } from 'src/app/services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { FavoriteService } from 'src/app/services/favorite.service';
@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss'],
})
export class MovieModalComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    public movieService: MovieService,
    private sanitizer: DomSanitizer, 
    public navCtrl: NavController,
    public favoriteService: FavoriteService
    
  ) { }
  @Input()  movie: Movie = {} as Movie;
  @Input() genreName!: string; 
  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {}


  toggleFavorite(movie: Movie) {
    if (this.favoriteService.isInFavorites(movie.id)) {
      this.favoriteService.removeFromFavorites(movie);
    } else {
      this.favoriteService.addToFavorites(movie);
    }
    this.closeModal()
  }

  
  async openVideoPlayer(movieId: number) {
    this.closeModal()
    const key = await this.movieService.getMovieById(movieId);
    console.log("KEY FROM");
    if (key) {
      const videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${key}`);
      this.navCtrl.navigateForward(`/video-player/${movieId}`, { state: { videoUrl } });
    } else {
      console.log('Video not found.');
    }
  }
}
