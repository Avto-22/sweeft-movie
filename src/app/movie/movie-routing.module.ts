import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { MovieComponent } from './movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavouriteMovieComponent } from './favourite-movie/favourite-movie.component';

const routes: Route[] = [
  {
    path: '',
    component: MovieComponent,
  },
  {
    path: 'favourite-movie',
    component: FavouriteMovieComponent
  },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
