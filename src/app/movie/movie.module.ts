import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { HorizontalScrollDirective } from './components/movie-details/horizontal-scroll.directive';
import { MostWatchedMovieListComponent } from './components/most-watched-movie-list/most-watched-movie-list.component';
import { FavouriteMovieComponent } from './components/favourite-movie/favourite-movie.component';
import { SharedModule } from '../shared/shared.module';
import { MonthPipe } from '../shared/pipes/month.pipe';
import { RuntimePipe } from '../shared/pipes/runtime.pipe';
import { SafePipe } from '../shared/pipes/safe.pipe';
import { TrailerComponent } from './components/movie-details/trailer/trailer.component';
import { CollectionSliderComponent } from './components/collection-slider/collection-slider.component';
import { SwiperModule } from 'swiper/angular';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CollectionsComponent } from './components/collections/collections.component';
import { CollectionDetailComponent } from './components/collection-detail/collection-detail.component';

@NgModule({
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule,
    SwiperModule,
    NgxSliderModule 
  ],
  declarations: [MovieComponent, MovieDetailsComponent, HorizontalScrollDirective, MostWatchedMovieListComponent, FavouriteMovieComponent, MonthPipe, RuntimePipe, SafePipe, TrailerComponent,CollectionSliderComponent, CollectionsComponent, CollectionDetailComponent],
  providers: []
})
export class MovieModule { }
