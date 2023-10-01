import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { IMovie } from 'src/app/interfaces/interfaces';
import { MovieService } from 'src/app/services/movie.service';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  favoriteMovies: IMovie[] = [];

  constructor(private favoriteService: FavoriteService,  public movieService: MovieService, public modalService: ModalService) {}

  ngOnInit() {
    console.log(" this.favoriteMovies",  this.favoriteMovies);
    this.favoriteMovies = this.favoriteService.getFavoriteMovies();
  }

}
