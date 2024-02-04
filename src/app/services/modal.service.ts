import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MovieModalComponent } from '../components/movie-modal/movie-modal.component';
import { Movie } from '../interfaces/interfaces';
import { GenresService } from './genres.service';
@Injectable({
  providedIn: 'root'
})
export class ModalService {



  constructor(private modalController: ModalController,
    private genresService: GenresService,
    ) { }

  async openMovieModal(movie: Movie) {
    const modal = await this.modalController.create({
      component: MovieModalComponent,
      componentProps: {
        movie,
        genreName: this.genresService.getGenreNameById(movie.genre_ids)
      },
    });
    return await modal.present();
  }
}
