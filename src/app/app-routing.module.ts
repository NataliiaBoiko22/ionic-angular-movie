import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
        redirectTo: 'loader',
    pathMatch: 'full'

    // redirectTo: '/video-list',
    // pathMatch: 'full'
  },
  {
    path: 'video-list',
    loadChildren: () => import('./pages/video-list/video-list.module').then( m => m.VideoListPageModule)
  },
  {
    path: 'video-player/:id', 
    loadChildren: () => import('./pages/video-player/video-player.module').then( m => m.VideoPlayerPageModule)
  },
  {
    path: 'loader',
    loadChildren: () => import('./pages/loader/loader.module').then( m => m.LoaderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'video-list',
    loadChildren: () => import('./pages/video-list/video-list.module').then( m => m.VideoListPageModule),
    data: { labels: ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'] },

  },
  {
    path: 'video-player/:movieId',
    loadChildren: () => import('./pages/video-player/video-player.module').then( m => m.VideoPlayerPageModule)
  },
  {
    path: 'favorite',
    loadChildren: () => import('./pages/favorite/favorite.module').then( m => m.FavoritePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
