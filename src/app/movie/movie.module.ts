import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieApiService, BASE_URL, API_KEY } from './services/movie-api.service';
import { environment } from 'src/environments/environment';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { HorizontalScrollDirective } from './components/movie-details/horizontal-scroll.directive';
import { MostWatchedMovieListComponent } from './components/most-watched-movie-list/most-watched-movie-list.component';
import { FavouriteMovieComponent } from './components/favourite-movie/favourite-movie.component';
import { SharedModule } from '../shared/shared.module';
import { MonthPipe } from '../shared/pipes/month.pipe';
import { RuntimePipe } from '../shared/pipes/runtime.pipe';
import { SafePipe } from '../shared/pipes/safe.pipe';
import { TrailerComponent } from './components/movie-details/trailer/trailer.component';

@NgModule({
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule
  ],
  declarations: [MovieComponent, MovieDetailsComponent, HorizontalScrollDirective, MostWatchedMovieListComponent, FavouriteMovieComponent, MonthPipe, RuntimePipe, SafePipe, TrailerComponent],
  providers: [
  //   MovieApiService, {
  //   provide: BASE_URL,
  //   useValue: environment.baseUrl
  // },
  // {
  //   provide: API_KEY,
  //   useValue: environment.apiKey
  // }
]
})
export class MovieModule { }
