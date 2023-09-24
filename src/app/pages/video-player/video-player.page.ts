import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.scss'],
})



export class VideoPlayerPage  implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private renderer: Renderer2  
  ) {}


ngOnInit() {
  this.route.paramMap.subscribe((params) => {
    if (params !== null) {
      const movieId = params.get('id');
      if (movieId !== null) {
        console.log("movieId from ngOnInit", movieId);
        const parsedMovieId = +movieId;
        if (!isNaN(parsedMovieId)) {
          this.loadVideo(parsedMovieId);
        }
      }
    }
  });
}

async loadVideo(movieId: number) {
  try {
    const key = await this.movieService.getMovieById(movieId);
    if (key) {
      const url = `https://www.youtube.com/embed/${key}`;

      const newIframe = this.renderer.createElement('iframe');
      this.renderer.setAttribute(newIframe, 'src', url);
      this.renderer.setAttribute(newIframe, 'width', '100%');
      this.renderer.setAttribute(newIframe, 'height', '100%');
      this.renderer.setAttribute(newIframe, 'title', 'video');

      const container = this.renderer.selectRootElement('.video-container'); 
      this.renderer.appendChild(container, newIframe);
    } else {
      console.log('Video key is not available for this movie.');
    }
  } catch (error) {
    console.error('Error with load video', error);
  }
}
  }
