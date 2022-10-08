import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieApiService, BASE_URL, API_KEY } from './services/movie-api.service';
import { environment } from 'src/environments/environment';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { HorizontalScrollDirective } from './movie-details/horizontal-scroll.directive';
import { MostWatchedMovieListComponent } from './most-watched-movie-list/most-watched-movie-list.component';
import { FavouriteMovieComponent } from './favourite-movie/favourite-movie.component';
import { SharedModule } from '../shared/shared.module';
import { MonthPipe } from './movie-details/pipes/month.pipe';
import { RuntimePipe } from './movie-details/pipes/runtime.pipe';
import { SafePipe } from './movie-details/pipes/safe.pipe';
import { TrailerComponent } from './movie-details/trailer/trailer.component';

@NgModule({
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule
  ],
  declarations: [MovieComponent, MovieDetailsComponent, HorizontalScrollDirective, MostWatchedMovieListComponent, FavouriteMovieComponent, MonthPipe, RuntimePipe, SafePipe, TrailerComponent],
  providers: [MovieApiService, {
    provide: BASE_URL,
    useValue: environment.baseUrl
  },
  {
    provide: API_KEY,
    useValue: environment.apiKey
  }
]
})
export class MovieModule { }
