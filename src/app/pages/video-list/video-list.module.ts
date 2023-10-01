import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoListPageRoutingModule } from './video-list-routing.module';

import { VideoListPage } from './video-list.page';
import { VideoFilterComponent } from 'src/app/components/video-filter/video-filter.component';
import { IonContent } from '@ionic/angular';
import { MovieModalComponent } from 'src/app/components/movie-modal/movie-modal.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoListPageRoutingModule
  ],
  declarations: [VideoListPage, VideoFilterComponent, MovieModalComponent],
  providers: [
    IonContent, 
  ],
})
export class VideoListPageModule {}
