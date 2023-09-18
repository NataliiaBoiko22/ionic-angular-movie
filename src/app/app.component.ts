import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Movies', url: '/folder/movies', icon: 'videocam' },
    { title: 'Player', url: '/folder/player', icon: 'play-circle' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
